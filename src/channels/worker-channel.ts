import { GenericChannel } from 'ts-event-bus';

export class WorkerChannel extends GenericChannel {
  constructor(private _worker: Worker, private _type: string) {
    super();
    this._connected();
    this._worker.addEventListener('message', ({ data }) => {
      console.log('in message callback', data.message, this._type);
      if (!data || data.message.type !== this._type) {
        return;
      }
      this._messageReceived(data.message);
      console.log('on message listener in channel', data);
    });
  }

  public send(message: object): void {
    console.log('worker calling send', message);
    this._worker.postMessage({
      type: this._type,
      message,
    });
  }
}
