import TabsBroadcast from 'tabs-broadcast';

export const EVENTS = {
  map: {
    panTo: 'map:pan-to',
  },
  ui: {
    bbcard: {
      open: 'ui:bbcard-open',
      close: 'ui:bbcard-close',
    },
  },
};

const tbConfig = {
  channelName: 'jeric2o-event-manager-bc',
  listenOwnChannel: true,
  onBecomePrimary: () => null,
  emitByPrimaryOnly: false,
};

export const broadcaster = new TabsBroadcast(tbConfig);
