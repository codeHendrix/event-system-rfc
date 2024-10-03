import { AllGeoJSON } from '@turf/helpers';

export type PanToParams = {
  zoomTo: boolean;
  bufferNM: number;
  geometry: AllGeoJSON;
};

export type ChannelType =
  | 'map'
  | 'baseball-card'
  | 'offscreen-indicators'
  | 'other';
