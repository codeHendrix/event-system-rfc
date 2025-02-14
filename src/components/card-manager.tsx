import { useState } from 'react';
import { Information } from './information';
import { eventManager } from '../event-manager';
import { OpenCardParams } from '../types';

type CardState = null | {
  id: string;
  coordinates: [number, number];
};

type OpenCardEvent = { payload: OpenCardParams };

const { broadcaster, eventTypes } = eventManager;
const { ui } = eventTypes;

// NOTE: could easily do a lookup here to get a custom card. for simplicity sake we just reference the same component.
export function CardManager() {
  const [card, setCard] = useState<CardState>(null);

  broadcaster.once(ui.bbcard.open, (data: OpenCardEvent) => {
    const { id, coordinates } = data.payload;

    setCard({ id, coordinates });
  });

  broadcaster.once(ui.bbcard.close, () => setCard(null));

  if (!card) {
    return null;
  }

  return <Information id={card.id} coordinates={card.coordinates} />;
}
