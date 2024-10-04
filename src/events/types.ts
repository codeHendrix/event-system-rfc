import { PanToParams } from '../types';

type EventMessage<T> = {
  type: string;
  payload: T;
};

export type PingMessage = EventMessage<string>;

export type CentorOnMessage = EventMessage<PanToParams>;
