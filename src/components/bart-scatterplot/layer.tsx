import { ScatterplotLayer } from 'deck.gl';
import { BART_LAYER_NAME } from './constants';

export const BartStationLayer = new ScatterplotLayer({
  id: BART_LAYER_NAME,
  data: './data/bart-stations.json',
  stroked: true,
  getPosition: (d) => d.coordinates,
  getRadius: (d) => Math.sqrt(d.exits),
  getFillColor: [255, 140, 0],
  getLineColor: [0, 0, 0],
  getLineWidth: 10,
  radiusScale: 6,
  pickable: true,
});
