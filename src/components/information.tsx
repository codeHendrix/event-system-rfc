import { Stack } from '@mui/material';
import { BaseballCard } from './baseball-card';
import { Controls } from './controls';

export function Information({
  id,
  coordinates,
}: {
  id: string;
  coordinates?: [number, number];
}) {
  return (
    <BaseballCard>
      <Stack>
        <Controls id={id} coordinates={coordinates ?? [NaN, NaN]} />
      </Stack>
      <div>Hello I'm BB Card {id}</div>
    </BaseballCard>
  );
}
