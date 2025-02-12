import { createEventBus } from 'ts-event-bus';
import { events } from './events';
import { BroadcastEventChannel } from './channels/broadcast-channel';
// import { SharedWorkerChannel } from './channels/shared-worker-channel';

export const EventBus = createEventBus({
  events,
  // channels: [new SharedWorkerChannel()],
  channels: [new BroadcastEventChannel('test channel')],
});
