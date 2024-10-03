import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { GridView } from '@mui/icons-material';

export function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Tooltip title="Dashboard">
            <IconButton
              size="small"
              href="/dashboard/"
              referrerPolicy="no-referrer"
              target="_blank"
            >
              <GridView fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
