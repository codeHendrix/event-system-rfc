import { GenericChannel } from 'ts-event-bus';

export class BroadcastEventChannel extends GenericChannel {
  private _receiveBc: BroadcastChannel;
  private _sendBc: BroadcastChannel;

  constructor(channelName: string) {
    super();
    this._receiveBc = new BroadcastChannel(channelName);
    this._sendBc = new BroadcastChannel(channelName);
    this._init();
  }

  private _init() {
    this._connected();

    this._receiveBc.onmessage = ({ data }) => {
      // console.log('Received:', data.message);
      this._messageReceived(data.message);
    };

    this._receiveBc.onmessageerror = ({ data }) => {
      // console.error('Broadcast message error:', data);
      this._error(data);
    };
  }

  public send(message: object): void {
    // console.log('Sending:', message);
    this._sendBc.postMessage({ message });
  }
}
