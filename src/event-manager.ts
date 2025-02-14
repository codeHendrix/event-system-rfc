import TabsBroadcast, { type TDefaultConfig } from 'tabs-broadcast';
import type { EventData, ConnectionMetadata, WindowType } from './types';

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
  connection: {
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
    connection: {
      register: 'connection:register',
      unregister: 'connection:unregister',
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
  connections: Map<string, ConnectionMetadata>;
  eventTypes: Events;
  topics: Topics;
  system: string;

  private constructor(config: EventManagerConfig) {
    const { system, topics, eventTypes, tbConfig } = config;
    this.system = system;
    this.eventTypes = eventTypes;
    this.topics = topics;
    this.broadcaster = new TabsBroadcast(tbConfig);

    this.connections = this.load();

    this.init();
  }

  private init() {
    this.broadcaster.on(
      this.eventTypes.connection.register,
      ({ payload }: EventData<ConnectionMetadata>) => this.register(payload)
    );

    this.broadcaster.on(
      this.eventTypes.connection.unregister,
      ({ payload }: EventData<ConnectionMetadata>) => this.unregister(payload)
    );

    console.log(this.broadcaster.getEvents());
  }

  register = (connection: ConnectionMetadata) => {
    console.log('calling register');
    if (!this.connections.has(connection.id)) {
      this.connections.set(connection.id, connection);
      this.save();
    } else {
      console.log('Connection already exists:', connection.id);
    }
  };

  unregister = (connection: ConnectionMetadata) => {
    console.log('calling unregister');
    if (this.connections.has(connection.id)) {
      this.connections.delete(connection.id);
      this.save();
    }
  };

  save() {
    console.log(
      'saving connections. number of connections to be saved',
      this.connections.size
    );
    localStorage.setItem(
      'connections',
      JSON.stringify(Array.from(this.connections))
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
    return this?.connections?.size ?? 0;
  };

  getConnectionCountByType = (type: WindowType) =>
    Array.from(this.connections.values()).filter((conn) => conn.type === type)
      .length;

  getConnections() {
    return this.connections;
  }

  getAllConnectionsByType = (type: WindowType) => {
    const results = [];

    for (const [k, v] of this.connections) {
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
