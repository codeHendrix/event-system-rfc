import { BroadcastChannel } from 'broadcast-channel';
import { GenericChannel, TransportMessage } from 'ts-event-bus';
import { ChannelType } from '../types/map-events';

type ChannelEventMessage = { message: TransportMessage };

// Note: idea here is to have all possible broadcast channels. Based on incoming message it is then decided which channel to interact with.
export class CombinedBroadcastEventChannel extends GenericChannel {
  private _channels: Record<ChannelType, BroadcastChannel | null> = {
    map: null,
    'baseball-card': null,
    'offscreen-indicators': null,
    other: null,
  };
  private _channelTypes: ChannelType[] = [
    'map',
    'baseball-card',
    'offscreen-indicators',
    'other',
  ];

  constructor() {
    super();
    this._init();
  }

  private _init() {
    this._channelTypes.forEach((name) => {
      this._channels[name] = new BroadcastChannel(name);
      this._channels[name].addEventListener('message', this.onMessage);
    });
    this._connected();
  }

  private onMessage(event: MessageEvent<ChannelEventMessage>) {
    const { data } = event;
    console.log('data', data, 'event', event);

    if (!data) {
      return;
    }
    this._messageReceived(data.message);
  }

  send(message: TransportMessage): void {
    if ('data' in message && message.data.channelType) {
      const channel = message.data.channelType as ChannelType;
      this._channels[channel]?.postMessage({ message });
      return;
    }

    console.log('sending message', message);
    (Object.keys(this._channels) as ChannelType[]).forEach(
      (name: ChannelType) => this._channels[name]?.postMessage({ message })
    );
  }
}
