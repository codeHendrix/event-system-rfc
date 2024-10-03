import { Stack } from '@mui/material';
import { BaseballCard } from '../baseball-card';
import { Controls } from '../baseball-card/controls';

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
        <Controls coordinates={coordinates ?? [NaN, NaN]} />
      </Stack>
      <div>Hello I'm BB Card One with Id: {id}</div>
    </BaseballCard>
  );
}
