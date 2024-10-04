import { CenterFocusWeak, Close, ZoomIn, Link } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { tabsBroadcast, EntityEvents, MapEvents } from '../../events/events';

export function Controls({ coordinates }: { coordinates: [number, number] }) {
  const handleZoomTo = () => {
    const event = {
      zoomTo: true,
      bufferNM: 5,
      geometry: {
        type: 'Point',
        coordinates,
      },
    };

    tabsBroadcast.emit(MapEvents.CENTER_ON, event);
  };

  const handleCenterOn = () => {
    const event = {
      zoomTo: false,
      bufferNM: 5,
      geometry: {
        type: 'Point',
        coordinates,
      },
    };

    tabsBroadcast.emit(MapEvents.CENTER_ON, event);
  };

  const handleClose = () => tabsBroadcast.emit(EntityEvents.CLOSE_CARD, null);

  return (
    <Stack direction="row" spacing={3}>
      <Tooltip title="center on">
        <IconButton onClick={handleCenterOn}>
          <CenterFocusWeak />
        </IconButton>
      </Tooltip>
      <Tooltip title="zoom to">
        <IconButton onClick={handleZoomTo}>
          <ZoomIn />
        </IconButton>
      </Tooltip>
      <Tooltip title="tether to">
        <IconButton>
          <Link />
        </IconButton>
      </Tooltip>
      <Tooltip title="close">
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
