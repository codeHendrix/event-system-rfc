import { useEffect, useState } from 'react';
import { Information } from './information';
import { EventBus } from '../event-bus/event-bus';

type CardState = null | {
  id: string;
  coordinates: [number, number];
};

// NOTE: could easily do a lookup here to get a custom card. for simplicity sake we just reference the same component.
export function CardManager() {
  const [card, setCard] = useState<CardState>(null);

  useEffect(() => {
    const openCardUnsub = EventBus.openCard.on((payload) => {
      const { id, picked, coordinates } = payload;

      if (picked && id) {
        setCard({ id, coordinates });
        return;
      }

      setCard(null);
    });

    const closeCardUnsub = EventBus.closeCard.on(() => setCard(null));
    return () => {
      openCardUnsub();
      closeCardUnsub();
    };
  }, []);

  if (!card) {
    return null;
  }

  return <Information id={card.id} coordinates={card.coordinates} />;
}
