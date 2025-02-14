import { IconButton, Tooltip } from '@mui/material';
import { useStore } from '../state';

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
  const activeId = useStore((state) => state.activeId);
  const disabled = shouldDisable?.(id, activeId);
  const render = shouldRender(id, activeId);

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
