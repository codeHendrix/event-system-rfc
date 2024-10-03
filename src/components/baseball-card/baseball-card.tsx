import { Box, Card, CardContent, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export function BaseballCard({ children }: PropsWithChildren) {
  return (
    <Card sx={{ display: 'flex', width: '400px' }}>
      <Stack>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>{children}</CardContent>
        </Box>
      </Stack>
    </Card>
  );
}
