import { createEventBus, slot } from 'ts-event-bus';
import { PanToParams } from '../types';
import { ChannelType } from '../types/map-events';

export const CardEvents = {
  openCard: slot<
    {
      layer?: string;
      id: string;
      picked: boolean;
      coordinates: [number, number];
    },
    void
  >(),
};

export const BaseBallCardEventBus = createEventBus({
  events: CardEvents,
  channels: [],
});

// idea: specify what broadcast channel you want to emit event on. ie ping "hello" on map channel. (not currently using)
export const MapChannelEvents = {
  centerOn: slot<[ChannelType, PanToParams], void>(),
  ping: slot<[ChannelType, string], void>(),
};

export const MapEvents = {
  centerOn: slot<PanToParams, void>(),
  // ping: slot<string, void>(),
  ping: slot<string, void>({ noBuffer: true }), // currently only "works" when we specify noBuffer: true. https://github.com/Dashlane/ts-event-bus/tree/master?tab=readme-ov-file#buffering
};
