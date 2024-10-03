import { GenericChannel } from 'ts-event-bus';

export class SharedWorkerChannel extends GenericChannel {
  constructor(private _worker: SharedWorker, private _type: string) {
    super();
    this._init();
  }

  private _init() {
    this._registerOnMessage();
    this._registerOnMessageError();
    this._registerOnError();
    this._connected();
    console.log(this._worker);
  }

  private _registerOnMessage() {
    this._worker.port.onmessage = (event: MessageEvent) => {
      const { data } = event;
      console.log('data', data, 'event', event);

      if (!data || data.message.type !== this._type) {
        return;
      }
      this._messageReceived(data.message);
    };
  }

  private _registerOnMessageError() {
    this._worker.port.onmessageerror = (e) => {
      console.log('on message error event', e);
      this._error(e);
      this._disconnected();
    };
  }

  private _registerOnError() {
    this._worker.onerror = (errorEvent: ErrorEvent) => {
      console.log('error in worker', errorEvent);
    };
  }

  public send(message: object): void {
    console.log('calling send', message);
    this._worker.port.postMessage({
      type: this._type,
      message,
    });
  }
}
