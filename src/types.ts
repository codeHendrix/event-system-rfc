import { Viewport } from 'deck.gl';
import { EventManager } from 'mjolnir.js';

export type PanToParams = {
  zoomTo: boolean;
  bufferNM: number;
  geometry: { type: string; coordinates: [number, number] };
};

export type OpenCardParams = {
  id: string;
  picked: boolean;
  coordinates: [number, number];
};

export type EventData<T> = {
  payload: T;
};

export enum WindowType {
  Dashboard = 'Dashboard',
  COP = 'COP',
}

export type ConnectionId = string;

export type ConnectionState = {
  highlighted?: boolean;
  name?: string;
  type?: WindowType;
};

export type ConnectionMetadata = {
  id: ConnectionId;
} & ConnectionState;

/**
 * NOTE: STOLEN DIRECTLY FROM APP
 * */
export type ControllerOpts = {
  /**
   * NOTE: timeline technically exists via import { Timeline } from '@luma.gl/core'; but
   * it often times causes npm i to fail. Reverting to any for now until luma fixes it.
   * Having luma as a dev dependency does not solve this problem.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timeline: any;
  eventManager: EventManager;
  makeViewport: (opts: Record<string, unknown>) => Viewport;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onViewStateChange: (params: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onStateChange: (state: any) => void;
};
