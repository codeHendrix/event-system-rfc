import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const sx = {
  height: '100%',
  position: 'relative',
  bgcolor: 'background.paper',
};

export function Root() {
  return (
    <Box sx={sx}>
      <Outlet />
    </Box>
  );
}
