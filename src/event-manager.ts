import TabsBroadcast, { type TDefaultConfig } from 'tabs-broadcast';
import type { EventData, WindowMetadata, WindowType } from './types';

type Topics = Record<string, string> & { global: string };

type Events = {
  map: {
    panTo: string;
  };
  ui: {
    bbcard: {
      open: string;
      close: string;
    };
  };
  window: {
    register: string;
    unregister: string;
  };
};

type EventManagerConfig = {
  system: string;
  topics: Topics;
  eventTypes: Events;
  tbConfig: TDefaultConfig;
};

const config: EventManagerConfig = {
  system: 'jeric2o-event-manager',
  topics: {
    global: 'global',
  },
  eventTypes: {
    window: {
      register: 'window:register',
      unregister: 'window:unregister',
    },
    map: {
      panTo: 'map:pan-to',
    },
    ui: {
      bbcard: {
        open: 'ui:bbcard-open',
        close: 'ui:bbcard-close',
      },
    },
  },
  tbConfig: {
    channelName: 'jeric2o-event-manager-bc',
    listenOwnChannel: true,
    onBecomePrimary: () => null,
    emitByPrimaryOnly: false,
  },
};

export class EventManager {
  private static instance: EventManager;

  broadcaster: TabsBroadcast;
  windows: Map<string, WindowMetadata>;
  eventTypes: Events;
  topics: Topics;
  system: string;

  private constructor(config: EventManagerConfig) {
    const { system, topics, eventTypes, tbConfig } = config;
    this.system = system;
    this.eventTypes = eventTypes;
    this.topics = topics;
    this.broadcaster = new TabsBroadcast(tbConfig);

    this.windows = this.load();

    this.init();
  }

  private init() {
    this.broadcaster.on(
      this.eventTypes.window.register,
      ({ payload }: EventData<WindowMetadata>) => this.register(payload)
    );

    this.broadcaster.on(
      this.eventTypes.window.unregister,
      ({ payload }: EventData<WindowMetadata>) => this.unregister(payload)
    );
  }

  register = (connection: WindowMetadata) => {
    if (!this.windows.has(connection.id)) {
      this.windows.set(connection.id, connection);
    } else {
      this.save();
      console.log('Connection already exists:', connection.id);
    }
  };

  unregister = (connection: WindowMetadata) => {
    console.log('calling unregister');
    if (this.windows.has(connection.id)) {
      this.windows.delete(connection.id);
      this.save();
    }
  };

  save() {
    console.log(
      'saving connections. number of connections to be saved',
      this.windows.size
    );
    localStorage.setItem(
      'connections',
      JSON.stringify(Array.from(this.windows))
    );
  }

  load() {
    const savedConnections = localStorage.getItem('connections');

    if (!savedConnections) {
      return new Map();
    }

    try {
      const parsedData = JSON.parse(savedConnections);

      if (Array.isArray(parsedData)) {
        return new Map(parsedData);
      }
    } catch (error) {
      console.error('Error parsing stored data:', error);
    }

    return new Map();
  }

  getConnectionCount = () => {
    return this?.windows?.size ?? 0;
  };

  getConnectionCountByType = (type: WindowType) =>
    Array.from(this.windows.values()).filter((conn) => conn.type === type)
      .length;

  getConnections() {
    return this.windows;
  }

  getAllConnectionsByType = (type: WindowType) => {
    const results = [];

    for (const [k, v] of this.windows) {
      if (v.type === type) {
        results.push({ k, v });
      }
    }

    return results;
  };

  public static getInstance(config?: EventManagerConfig): EventManager {
    if (!EventManager.instance) {
      if (!config) {
        throw new Error(
          'Config is required to create the EventManager instance.'
        );
      }
      EventManager.instance = new EventManager(config); // Create a new instance if it doesn't exist
    }
    return EventManager.instance; // Return the existing instance
  }
}

export const eventManager = EventManager.getInstance(config);

// add middleware event to listen to all events emitted
// register windows
// center on indiviual COPs
// re open windows in same state
// open additional cop, match view state existing COP. (populate initialView state??)
// do I have more than one cop conditionally render dropdown.
// central location for initializing state. (window state, what cards were open, what data do we need store if a browser tab crashed.)
// incorporate dockview for testing

// type MessageData = {
//   type: 'broadcast' | 'to-one';
//   topic: string;
//   recipientId: string;
//   senderId: string;
//   payload: any;
// };

// abstract attachment and cleanup in custom hook
// attach once and sync with zustand store
