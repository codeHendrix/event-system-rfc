import { useState } from 'react';
import {
  Information as BartInformation,
  BART_LAYER_NAME,
} from '../bart-scatterplot';
import { BBCardTwo } from './cards/bbcard-two';
import { EntityEvents, tabsBroadcast } from '../../events/events';

type CardLookup = Record<
  string,
  ({
    id,
    coordinates,
  }: {
    id: string;
    coordinates?: [number, number];
  }) => JSX.Element
>;

const Cards: CardLookup = {
  [BART_LAYER_NAME]: BartInformation,
  LAYER_2: BBCardTwo,
};

export function Card() {
  const [card, setCard] = useState<null | {
    layer: keyof CardLookup;
    coordinates: [number, number];
    id: string;
  }>(null);

  tabsBroadcast.on(EntityEvents.OPEN_CARD, ({ payload }) => {
    console.log(payload);
    const { layer, id, picked, coordinates } = payload;
    console.log('inside on open card', { layer, id, picked, coordinates });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    picked && layer ? setCard({ layer, id, coordinates }) : setCard(null);
  });

  tabsBroadcast.on(EntityEvents.CLOSE_CARD, () => setCard(null));

  if (!card) {
    return null;
  }

  const Information = Cards[card.layer];

  return <Information id={card.id} coordinates={card.coordinates} />;
}
