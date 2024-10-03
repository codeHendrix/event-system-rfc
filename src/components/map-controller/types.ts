import { Viewport } from 'deck.gl';
import { EventManager } from 'mjolnir.js';

/**
 * NOTE: deck.gl doesnt export a type for the constructor props so have to make my own
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
