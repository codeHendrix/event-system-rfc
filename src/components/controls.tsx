import {
  CenterFocusWeak,
  Close,
  ZoomIn,
  OpenInBrowserRounded,
} from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { EventBus } from '../event-bus/event-bus';
import { OpenCardParams } from '../types';

type CONTROL_TITLES = ['center on', 'zoom to', 'open card', 'close card'];
type ControlTitle = CONTROL_TITLES[number];
type ControlProps = {
  coordinates: [number, number];
  hideControls?: ControlTitle[];
  cardEventInfo?: OpenCardParams; // this is silly giving the controls this much awareness. Only for example sake.
};

export function Controls({
  coordinates,
  cardEventInfo,
  hideControls = [],
}: ControlProps) {
  const geometry = { type: 'Point', coordinates };

  function handlePanTo(
    zoomTo: boolean,
    geometry: { type: string; coordinates: [number, number] }
  ) {
    EventBus.panTo({
      zoomTo,
      bufferNM: 5,
      geometry,
    });
  }

  const handleZoomTo = () => {
    handlePanTo(true, geometry);
  };

  const handleCenterOn = () => {
    handlePanTo(false, geometry);
  };

  const handleClose = () => EventBus.closeCard();
  const handleOpen = () => {
    if (cardEventInfo) {
      EventBus.openCard(cardEventInfo);
      return;
    }
  };

  const controls = (
    [
      { title: 'center on', Icon: CenterFocusWeak, onClick: handleCenterOn },
      { title: 'zoom to', Icon: ZoomIn, onClick: handleZoomTo },
      { title: 'open card', Icon: OpenInBrowserRounded, onClick: handleOpen },
      { title: 'close card', Icon: Close, onClick: handleClose },
    ] as const
  ).filter(({ title }) => !hideControls.includes(title));

  return (
    <Stack direction="row" spacing={1}>
      {controls.map(({ title, Icon, onClick }) => (
        <Tooltip key={title} title={title}>
          <IconButton onClick={onClick}>
            <Icon />
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
}
