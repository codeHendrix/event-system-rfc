import Map from 'react-map-gl';
import DeckGL, { MapViewState, PickingInfo } from 'deck.gl';
import { BaseBallCardEventBus } from './events/events';
import { Card } from './components/card-manager/card-manager';
import { BartStationLayer } from './components/bart-scatterplot';
import { AppBar } from './components/app-bar';
import { Layout } from './layout';
import { CustomMapController } from './components/map-controller/map-controller';
import { MapEvents } from './events/events';
import { BroadcastEventChannel } from './channels/broadcast-event-channel';
import { createEventBus } from 'ts-event-bus';

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

const AppEventBus = createEventBus({
  events: MapEvents,
  channels: [new BroadcastEventChannel('map')],
});

const handleOnClick = (info: PickingInfo) => {
  const eventInfo = {
    layer: info?.layer?.id,
    id: info.picked ? info.object.name : null,
    picked: info.picked,
    coordinates: info.picked ? info.object.coordinates : [NaN, NaN],
  };

  BaseBallCardEventBus.openCard(eventInfo);
};

AppEventBus.ping.on((args) => console.log(`ping from ${args}`));

setInterval(() => {
  AppEventBus.ping('app');
}, 3000);

export function App() {
  return (
    <Layout
      top={<AppBar />}
      map={
        <>
          <DeckGL
            layers={[BartStationLayer]}
            initialViewState={INITIAL_VIEW_STATE}
            controller={CONTROLLER}
            onClick={handleOnClick}
          >
            <Map
              reuseMaps
              mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
              mapStyle={MAP_STYLE}
            />
            <Card />
          </DeckGL>
        </>
      }
    />
  );
}
