import bbox from '@turf/bbox';
import buffer from '@turf/buffer';
import center from '@turf/center';
import distance from '@turf/distance';
import { AllGeoJSON, convertLength, point, Units } from '@turf/helpers';
import { Position } from 'deck.gl';

export function getBufferBBox(geometry: AllGeoJSON | Position, radius: number) {
  //find the "radius" of the bbox containing the geometry by
  //using half of the diagonal of the box
  const tempBox = bbox(geometry as AllGeoJSON);
  const distanceOptions = { units: 'nauticalmiles' as Units };

  const tempRadius =
    distance(
      [tempBox[0], tempBox[1]],
      [tempBox[2], tempBox[3]],
      distanceOptions
    ) / 2;

  const newRadius = radius < tempRadius ? tempRadius : radius;

  return bbox(
    buffer(
      // @ts-expect-error who cares
      Array.isArray(geometry) ? point(geometry) : center(geometry).geometry,
      convertLength(newRadius, 'nauticalmiles', 'kilometers')
    ) as AllGeoJSON
  );
}
