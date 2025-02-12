import Map from 'react-map-gl';
import DeckGL, { MapViewState, PickingInfo } from 'deck.gl';
import { CardManager } from './components/card-manager';
import { AppBar } from './components/app-bar';
import { Layout } from './layout/layout';
import { CustomMapController } from './map-controller';
import { layers } from './components/layers';
import { EventBus } from './event-bus/event-bus';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiYWVzc2V4MjQiLCJhIjoiY20xaDRpaHhxMGFzNDJsbjBhYjFqaHdtZyJ9.NZLt-TFC8T9JRtIV-5ob8g';
const MAP_STYLE = 'mapbox://styles/mapbox/light-v9';

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
};

const CONTROLLER = {
  type: CustomMapController,
};

const handleOnClick = (info: PickingInfo) => {
  if (info.picked && info?.layer?.id) {
    const eventInfo = {
      id: info.layer.id,
      picked: info.picked,
      coordinates: info.object.coordinates ?? [NaN, NaN],
    };

    EventBus.openCard(eventInfo);
  }
};

export function App() {
  return (
    <Layout
      top={<AppBar />}
      map={
        <>
          <DeckGL
            layers={layers}
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
