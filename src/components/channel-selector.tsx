import { useState } from 'react';
import {
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
} from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useChannelStore } from '../store';

const options = [
  { label: 'Broadcast Channel', value: 'broadcast' },
  { label: 'Shared Worker Channel', value: 'sharedWorker' },
] as { label: string; value: 'broadcast' | 'sharedWorker' }[];

export function ChannelSelector() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { selectedChannel, setSelectedChannel } = useChannelStore();

  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    setSelectedChannel(options[index].value);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Tooltip title="channel selector">
        <IconButton onClick={() => setIsOpen(true)}>
          <ArrowDropDown fontSize="large" />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Stack direction="row" spacing={1}>
      <IconButton onClick={() => setIsOpen(false)}>
        <ArrowDropUp fontSize="large" />
      </IconButton>
      <List>
        <ListItemButton id="lock-button" onClick={handleClickListItem}>
          <ListItemText
            primary="Currently selected channel type"
            secondary={options[selectedIndex].label}
          />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.value}
            selected={selectedChannel === option.value}
            onClick={() => handleMenuItemClick(index)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
}
