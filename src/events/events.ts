import TabsBroadcast from 'tabs-broadcast';

export const EntityEvents = {
  OPEN_CARD: 'open-card',
  CLOSE_CARD: 'close-card',
};

export const MapEvents = {
  CENTER_ON: 'center-on',
  PING: 'ping',
};

export const tabsBroadcast = new TabsBroadcast({
  channelName: 'testChannel',
  listenOwnChannel: true,
  onBecomePrimary: (detail) => console.log('Became primary tab:', detail),
  emitByPrimaryOnly: false,
});
