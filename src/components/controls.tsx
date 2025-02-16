import {
  CenterFocusWeak,
  Close,
  OpenInBrowserRounded,
  ZoomIn,
} from '@mui/icons-material';
import { Stack } from '@mui/material';
import { useCallback } from 'react';
import { ControlButton } from './control-button';
import { useWindows } from '../hooks/useWindows';
import { WindowType } from '../types';
import { broadcaster, EVENTS } from '../event-bus/broadcaster';
import WindowSelector from './dropdown-selector';

type Geometry = { type: string; coordinates: [number, number] };

type ControlProps = {
  coordinates: [number, number];
  id: string;
  layer?: string;
};

const { map, ui } = EVENTS;

function handlePanTo(zoomTo: boolean, geometry: Geometry) {
  broadcaster.emit(map.panTo, {
    zoomTo,
    bufferNM: 5,
    geometry,
  });
}

function handleOpen(id: string, coordinates: [number, number], layer?: string) {
  broadcaster.emit(ui.bbcard.open, { id, coordinates, layer });
}

function handleClose() {
  broadcaster.emit(ui.bbcard.close);
}

function CenterOnControlButton({ id, coordinates }: ControlProps) {
  const { type } = useWindows();

  const handleOnClick = useCallback(() => {
    const geometry: Geometry = { type: 'Point', coordinates };
    handlePanTo(false, geometry);
  }, [coordinates]);

  const handleShouldDisable = useCallback(
    (id: string, activeId?: string) =>
      type === WindowType.Dashboard && id === activeId,
    [type]
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

function ZoomToControlButton({ id, coordinates }: ControlProps) {
  const { type } = useWindows();

  const handleOnClick = useCallback(() => {
    const geometry: Geometry = { type: 'Point', coordinates };
    handlePanTo(false, geometry);
  }, [coordinates]);

  const handleShouldDisable = useCallback(
    (id: string, activeId?: string) =>
      type === WindowType.Dashboard && id === activeId,
    [type]
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

function OpenControlButton({ id, coordinates, layer }: ControlProps) {
  const handleShouldRender = useCallback(
    (id?: string, activeId?: string) => id !== activeId,
    []
  );

  const handleOnClick = useCallback(
    () => handleOpen(id, coordinates, layer),
    [coordinates, id, layer]
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
      <WindowSelector />
      <CenterOnControlButton {...props} />
      <ZoomToControlButton {...props} />
      <OpenControlButton {...props} />
      <CloseControlButton {...props} />
    </Stack>
  );
}

{
  /* <BaseControl shouldRender={() => true})>
  <CenterOnControlButton {...props} />
</BaseControl>
<BaseControl shouldRender={() => true})>
        <Menu {...props} />
</BaseControl> */
}
