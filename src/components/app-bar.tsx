import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { GridView } from '@mui/icons-material';
import { ChannelSelector } from './channel-selector';

export function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Tooltip title="Dashboard">
            <IconButton
              size="small"
              href="/dashboard/"
              referrerPolicy="no-referrer"
              target="dashboard"
            >
              <GridView fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <ChannelSelector />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
