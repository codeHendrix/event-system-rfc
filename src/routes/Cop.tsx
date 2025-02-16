import Map from 'react-map-gl';
import DeckGL, { MapViewState, PickingInfo } from 'deck.gl';
import { CardManager } from '../components/card-manager';
import { AppBar } from '../components/app-bar';
import { Layout } from '../layout/layout';
import { CustomMapController } from '../map-controller';
import { Layer, Layer2 } from '../components/layers';
import { useRegisterWindow } from '../hooks/useRegisterWindow';
import { WindowType } from '../types';
import { MAP_STYLE, MAPBOX_ACCESS_TOKEN } from '../constants';
import { WindowProvider } from '../hooks/useWindows';
import { broadcaster, EVENTS } from '../event-bus/broadcaster';

const DEFAULT_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
};

const { ui } = EVENTS;

const INITIAL_VIEW_STATE: MapViewState = DEFAULT_VIEW_STATE;

const CONTROLLER = {
  type: CustomMapController,
};

const handleOnClick = (info: PickingInfo) => {
  if (info.picked && info.layer) {
    const eventInfo = {
      layer: info.layer.id,
      id: info.object.id,
      coordinates: info.object.coordinates ?? [NaN, NaN],
    };

    broadcaster.emit(ui.bbcard.open, eventInfo);
  }
};

export function Cop() {
  const id = useRegisterWindow(WindowType.COP);

  return (
    <WindowProvider id={id} type={WindowType.COP}>
      <Layout
        top={<AppBar />}
        map={
          <>
            <DeckGL
              layers={[Layer, Layer2]}
              initialViewState={INITIAL_VIEW_STATE}
              controller={CONTROLLER}
              onClick={handleOnClick}
            >
              <Map
                reuseMaps
                mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle={MAP_STYLE}
              />
              <CardManager />
            </DeckGL>
          </>
        }
      />
    </WindowProvider>
  );
}
