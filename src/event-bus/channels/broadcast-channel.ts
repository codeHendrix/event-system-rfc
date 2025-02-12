import { GenericChannel } from 'ts-event-bus';

export class BroadcastEventChannel extends GenericChannel {
  private _receiveBc?: BroadcastChannel;
  private _sendBc?: BroadcastChannel;
  private _channelName: string;

  constructor(channelName: string) {
    super();
    this._channelName = channelName;
    this._init();
  }

  private _init() {
    this._receiveBc = new BroadcastChannel(this._channelName);
    this._sendBc = new BroadcastChannel(this._channelName);
    this._connected();

    this._receiveBc.onmessage = ({ data }) => {
      console.log('Received:', data.message);
      this._messageReceived(data.message);
    };

    this._receiveBc.onmessageerror = ({ data }) => {
      console.error('Broadcast message error:', data);
      this._error(data);
      this._disconnected();
    };
  }
  /**
   * Initiate a port connection
   */
  public connect() {
    this._init();
  }

  /**
   * Automatically called when a Slot is triggered and the channel is disconnected
   */
  public autoReconnect() {
    this.connect();
  }

  public send(message: object): void {
    console.log('Sending:', message);
    this._sendBc?.postMessage({ message });
  }
}
