import {
  CenterFocusWeak,
  Close,
  OpenInBrowserRounded,
  ZoomIn,
} from '@mui/icons-material';
import { Stack } from '@mui/material';
import { eventManager } from '../event-manager';
import { useCallback } from 'react';
import { ControlButton } from './control-button';

type Geometry = { type: string; coordinates: [number, number] };

type ControlProps = {
  coordinates: [number, number];
  id: string;
  context: 'cop' | 'dashboard';
};

const { broadcaster, eventTypes } = eventManager;
const { map, ui } = eventTypes;

function handlePanTo(zoomTo: boolean, geometry: Geometry) {
  broadcaster.emit(map.panTo, {
    zoomTo,
    bufferNM: 5,
    geometry,
  });
}

function handleOpen(id: string, coordinates: [number, number]) {
  broadcaster.emit(ui.bbcard.open, { id, coordinates });
}

function handleClose() {
  broadcaster.emit(ui.bbcard.close);
}

function CenterOnControlButton({ id, coordinates, context }: ControlProps) {
  const handleOnClick = useCallback(() => {
    const geometry: Geometry = { type: 'Point', coordinates };
    handlePanTo(false, geometry);
  }, [coordinates]);

  const handleShouldDisable = useCallback(
    (id: string, activeId?: string) =>
      context === 'dashboard' && id === activeId,
    [context]
  );

  return (
    <ControlButton
      id={id}
      title="center-on"
      icon={<CenterFocusWeak />}
      onClick={handleOnClick}
      shouldDisable={handleShouldDisable}
    />
  );
}

function ZoomToControlButton({ id, coordinates, context }: ControlProps) {
  const handleOnClick = useCallback(() => {
    const geometry: Geometry = { type: 'Point', coordinates };
    handlePanTo(false, geometry);
  }, [coordinates]);

  const handleShouldDisable = useCallback(
    (id: string, activeId?: string) =>
      context === 'dashboard' && id === activeId,
    [context]
  );

  return (
    <ControlButton
      id={id}
      title="zoom-to"
      icon={<ZoomIn />}
      onClick={handleOnClick}
      shouldDisable={handleShouldDisable}
    />
  );
}

function OpenControlButton({
  id,
  coordinates,
}: {
  id: string;
  coordinates: [number, number];
}) {
  const handleShouldRender = useCallback(
    (id?: string, activeId?: string) => id !== activeId,
    []
  );

  const handleOnClick = useCallback(
    () => handleOpen(id, coordinates),
    [coordinates, id]
  );
  return (
    <ControlButton
      id={id}
      title="open"
      icon={<OpenInBrowserRounded />}
      onClick={handleOnClick}
      shouldRender={handleShouldRender}
    />
  );
}

function CloseControlButton({ id }: { id: string }) {
  const handleShouldRender = useCallback(
    (id?: string, activeId?: string) => id === activeId,
    []
  );

  return (
    <ControlButton
      id={id}
      title="close"
      icon={<Close />}
      onClick={handleClose}
      shouldRender={handleShouldRender}
    />
  );
}

export function Controls(props: ControlProps) {
  return (
    <Stack direction="row" spacing={1}>
      <CenterOnControlButton {...props} />
      <ZoomToControlButton {...props} />
      <OpenControlButton {...props} />
      <CloseControlButton {...props} />
    </Stack>
  );
}
