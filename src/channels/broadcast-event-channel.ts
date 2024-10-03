import { BroadcastChannel, BroadcastChannelOptions } from 'broadcast-channel';
import { GenericChannel } from 'ts-event-bus';

export class BroadcastEventChannel extends GenericChannel {
  private _channel: BroadcastChannel | null = null;

  constructor(
    private _channelName: string,
    private _options?: BroadcastChannelOptions
  ) {
    super();
    this._init();
  }

  private _init() {
    this._connected();
    this._channel = new BroadcastChannel(this._channelName, this._options);
    this._channel.addEventListener('message', this.onMessage);
  }

  private onMessage(event: MessageEvent) {
    const { data } = event;
    console.log({ data, event });

    if (!data) {
      return;
    }
    this._messageReceived(data.message);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  send(message: {}): void {
    console.log('calling send', message);
    if (this._channel) {
      this._channel.postMessage({
        message,
      });
    }
  }
}
