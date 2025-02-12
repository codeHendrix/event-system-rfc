import { GenericChannel } from 'ts-event-bus';

export class SharedWorkerChannel extends GenericChannel {
  private _worker: SharedWorker;

  constructor() {
    super();
    this._worker = new SharedWorker(new URL('../worker', import.meta.url), {
      type: 'module',
      name: 'shared event bus worker',
    });
    this._init();
  }

  private _init() {
    this._error = this._error.bind(this);
    this._messageReceived = this._messageReceived.bind(this);
    this._connected();

    this._worker.port.onmessage = ({ data }) => {
      // console.log({ data });
      this._messageReceived(data.message);
    };

    this._worker.onerror = ({ error }) => {
      console.log({ error });
      this._error(error);
    };

    window.addEventListener('unload', () => {
      console.log('unload called');
      this._worker.port.postMessage({ message: 'CLOSE' });
    });
  }

  public autoReconnect() {
    console.log('auto reconnect called');
    this._init();
  }

  public send(message: object): void {
    this._worker.port.postMessage({
      message,
    });
  }
}
