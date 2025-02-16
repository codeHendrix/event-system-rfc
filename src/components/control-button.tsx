import { IconButton, Tooltip } from '@mui/material';
import { selectors, useStore } from '../event-bus/state';

type ControlButtonPredicate = (id: string, activeId?: string) => boolean;

type BaseControlButtonProps = {
  id: string;
  title: string;
  icon: React.ReactNode;
  shouldDisable?: ControlButtonPredicate;
  shouldRender?: ControlButtonPredicate;
  onClick: () => void;
};

export function ControlButton({
  id,
  title,
  icon,
  onClick,
  shouldDisable,
  shouldRender = () => true,
}: BaseControlButtonProps) {
  const entity = useStore(selectors.selectedEntity);
  const disabled = shouldDisable?.(id, entity?.id);
  const render = shouldRender(id, entity?.id);

  if (!render) {
    return null;
  }

  return (
    <Tooltip title={title}>
      <IconButton onClick={onClick} disabled={disabled}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
