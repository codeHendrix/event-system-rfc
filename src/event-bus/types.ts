import { TDefaultConfig } from 'tabs-broadcast';
import { WindowMetadata } from '../types';

export type Topics = Record<string, string> & { global: string };

export type Events = {
  map: {
    panTo: string;
  };
  ui: {
    bbcard: {
      open: string;
      close: string;
    };
  };
  connection: {
    register: string;
    unregister: string;
  };
};

export type EventBusConfig = {
  topics: Topics;
  eventTypes: Events;
  tbConfig: TDefaultConfig;
};

export type WindowsMap = Map<string, WindowMetadata>;
