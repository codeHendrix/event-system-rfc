import { FlyToInterpolator, MapController, WebMercatorViewport } from 'deck.gl';
import center from '@turf/center';
import { getBufferBBox } from './utils';
import type { AllGeoJSON } from '@turf/helpers';
import type { ControllerOpts, EventData, PanToParams } from './types';
import { broadcaster, EVENTS } from './event-bus/broadcaster';

const defaultBufferNM = 20;
const TRANSITION_DURATION = 180;
const TRANSITION_INTERPOLATER = new FlyToInterpolator();

const { map } = EVENTS;

export class CustomMapController extends MapController {
  constructor(props: ControllerOpts) {
    super(props);
    broadcaster.on(map.panTo, ({ payload }: EventData<PanToParams>) =>
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
        : center(geometry as AllGeoJSON).geometry.coordinates;

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
          geometry as AllGeoJSON,
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
      console.log('ERROR', e);
      return;
    }
  }
}
