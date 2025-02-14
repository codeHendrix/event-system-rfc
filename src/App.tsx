import Map from 'react-map-gl';
import DeckGL, { MapViewState, PickingInfo } from 'deck.gl';
import { CardManager } from './components/card-manager';
import { AppBar } from './components/app-bar';
import { Layout } from './layout/layout';
import { CustomMapController } from './map-controller';
import { Layer } from './components/layers';
import { eventManager } from './event-manager';
import { useRegisterConnection } from './hooks/useRegisterConnection';
import { WindowType } from './types';

const DEFAULT_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
};

const { broadcaster, eventTypes } = eventManager;
const { ui } = eventTypes;

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiYWVzc2V4MjQiLCJhIjoiY20xaDRpaHhxMGFzNDJsbjBhYjFqaHdtZyJ9.NZLt-TFC8T9JRtIV-5ob8g';
const MAP_STYLE = 'mapbox://styles/mapbox/light-v9';

const INITIAL_VIEW_STATE: MapViewState = DEFAULT_VIEW_STATE;

const CONTROLLER = {
  type: CustomMapController,
};

const handleOnClick = (info: PickingInfo) => {
  if (info.picked) {
    const eventInfo = {
      id: info.object.id,
      coordinates: info.object.coordinates ?? [NaN, NaN],
    };

    broadcaster.emit(ui.bbcard.open, eventInfo);
  }
};

export function App() {
  useRegisterConnection(WindowType.COP);

  return (
    <Layout
      top={<AppBar />}
      map={
        <>
          <DeckGL
            layers={[Layer]}
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
  );
}
