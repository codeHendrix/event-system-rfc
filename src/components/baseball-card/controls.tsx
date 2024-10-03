import { CenterFocusWeak, Close, ZoomIn, Link } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { BroadcastEventChannel } from '../../channels/broadcast-event-channel';
import { createEventBus } from 'ts-event-bus';
import { MapEvents } from '../../events/events';

// const EventBus = createEventBus({
//   events: MapEvents,
//   channels: [new BroadcastEventChannel('map')],
// });

export function Controls({ coordinates }: { coordinates: [number, number] }) {
  const handleZoomTo = () => {
    console.log(coordinates);
    const event = {
      zoomTo: true,
      bufferNM: 5,
      geometry: {
        type: 'Point',
        coordinates,
      },
    };

    // @ts-expect-error who cares
    // EventBus.centerOn(event);
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

    // @ts-expect-error who cares
    // EventBus.centerOn(event);
  };

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
        <IconButton>
          <Close />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
