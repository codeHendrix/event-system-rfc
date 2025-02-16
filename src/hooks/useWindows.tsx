import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { WindowType } from '../types';
import { selectors, useStore } from '../event-bus/state';

type WindowContextType = {
  id: string;
  type: string;
};

const WindowContext = createContext<WindowContextType>({
  id: 'default',
  type: WindowType.COP,
});

export const WindowProvider = ({
  id,
  type,
  children,
}: PropsWithChildren<{ id: string; type: WindowType }>) => {
  return (
    <WindowContext.Provider value={{ id, type }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindows = () => {
  const { id, type } = useContext(WindowContext);
  const windows = useStore(selectors.windows);

  const allWindows = useMemo(() => Array.from(windows.values()), [windows]);
  const copWindows = useMemo(
    () =>
      Array.from(windows.values()).filter(
        (window) => window.type === WindowType.COP
      ),
    [windows]
  );
  const dashboardWindows = useMemo(
    () =>
      Array.from(windows.values()).filter(
        (window) => window.type === WindowType.Dashboard
      ),
    [windows]
  );

  const localWindow = useMemo(
    () => Array.from(windows.values()).find((window) => window.id === id),
    [id, windows]
  );

  return {
    id,
    type,
    windows: {
      local: localWindow,
      all: allWindows,
      [WindowType.COP]: copWindows,
      [WindowType.Dashboard]: dashboardWindows,
    },
  };
};
