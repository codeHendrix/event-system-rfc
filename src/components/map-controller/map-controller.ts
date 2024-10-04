import { FlyToInterpolator, MapController, WebMercatorViewport } from 'deck.gl';
import { PanToParams } from '../../types';
import center from '@turf/center';
import { getBufferBBox } from '../../utils';
import { ControllerOpts } from './types';
import { MapEvents, tabsBroadcast } from '../../events/events';

const defaultBufferNM = 20;
const TRANSITION_DURATION = 180;
const TRANSITION_INTERPOLATER = new FlyToInterpolator();

export class CustomMapController extends MapController {
  constructor(props: ControllerOpts) {
    super(props);
    tabsBroadcast.on(MapEvents.CENTER_ON, ({ payload }) =>
      this.zoomTo(payload)
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMapStateProps(props: any) {
    this.setProps({
      ...this.props,
      ...props,
    });
  }

  zoomTo({ zoomTo, bufferNM, geometry }: PanToParams) {
    try {
      if (!this) return;

      const centerCoords = Array.isArray(geometry)
        ? geometry
        : center(geometry).geometry.coordinates;

      const next = {
        longitude: centerCoords[0],
        latitude: centerCoords[1],
        // @ts-expect-error dunno
        zoom: this.props.zoom,
        transitionDuration: TRANSITION_DURATION,
        transitionInterpolator: TRANSITION_INTERPOLATER,
      };

      // Calculate zoom based on a buffer of the current geometry
      if (zoomTo) {
        const [minLon, minLat, maxLon, maxLat] = getBufferBBox(
          geometry,
          bufferNM ?? defaultBufferNM
        );

        const viewport = this.makeViewport(this.props) as WebMercatorViewport;

        const nextViewport = viewport.fitBounds([
          [minLon, minLat],
          [maxLon, maxLat],
        ]);

        next.zoom = nextViewport.zoom;
      }

      this.setMapStateProps(next);
    } catch (e: unknown) {
      // protecting this at the root level so an exception doesn't pop if bad data makes it here
      console.log('ERROR', e);
      return;
    }
  }
}
