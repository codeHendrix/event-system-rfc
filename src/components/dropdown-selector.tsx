import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useWindows } from '../hooks/useWindows';

export default function WindowSelector() {
  const { type, windows } = useWindows();

  const targetWindows = windows[type];

  console.log(type, windows, targetWindows);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!targetWindows.length) {
    return null;
  }

  return (
    <div>
      <Button id="basic-button" onClick={handleClick}>
        action
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {targetWindows.map(({ id, name }) => {
          return (
            <MenuItem key={id} onClick={handleClose}>
              {name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
