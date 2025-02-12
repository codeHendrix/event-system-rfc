import { createEventBus, Slot } from 'ts-event-bus';
import { events } from './events';
import { BroadcastEventChannel } from './channels/broadcast-channel';
import { SharedWorkerChannel } from './channels/shared-worker-channel';
import { PanToParams, OpenCardParams } from '../types';

const channels = {
  broadcast: new BroadcastEventChannel('test channel'),
  sharedWorker: new SharedWorkerChannel(),
};

// export const EventBus = createEventBus({
//   events,
//   channels: [channels[selectedChannel]],
// });

let EventBus: {
  panTo: Slot<PanToParams, void>;
  openCard: Slot<OpenCardParams, void>;
  closeCard: Slot<void, void>;
} | null = null;

function initializeEventBus(channelType: 'broadcast' | 'sharedWorker') {
  if (!channels[channelType]) {
    throw new Error(`Unsupported channel type: ${channelType}`);
  }

  EventBus = createEventBus({
    events,
    channels: [channels[channelType]],
  });

  return EventBus;
}

function getEventBus() {
  return EventBus;
}

export const EventBusUtils = {
  getEventBus,
  initializeEventBus,
};
