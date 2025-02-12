import { slot } from 'ts-event-bus';
import { PanToParams, OpenCardParams } from '../types';

export const events = {
  panTo: slot<PanToParams>(),
  openCard: slot<OpenCardParams>(),
  closeCard: slot<void>(),
};
