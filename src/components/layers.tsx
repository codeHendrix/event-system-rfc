import { ScatterplotLayer } from 'deck.gl';
import { SCATTERPLOT_LAYER_1, SCATTERPLOT_LAYER_2 } from '../constants';
import layer1Data from '../data/bart-stations.json';
import layer2Data from '../data/modified-bart-stations.json';

const Layer1 = new ScatterplotLayer({
  id: SCATTERPLOT_LAYER_1,
  data: layer1Data,
  stroked: true,
  getPosition: (d) => d.coordinates,
  getRadius: (d) => Math.sqrt(d.exits),
  getFillColor: [255, 140, 0],
  getLineColor: [0, 0, 0],
  getLineWidth: 10,
  radiusScale: 3,
  pickable: true,
});

const Layer2 = new ScatterplotLayer({
  id: SCATTERPLOT_LAYER_2,
  data: layer2Data,
  stroked: true,
  getPosition: (d) => d.coordinates,
  getRadius: (d) => Math.sqrt(d.exits),
  getFillColor: [30, 144, 255],
  getLineColor: [0, 0, 0],
  getLineWidth: 10,
  radiusScale: 3,
  pickable: true,
});

export const layers = [Layer1, Layer2];
