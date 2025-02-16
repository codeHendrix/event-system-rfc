import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { selectors, useStore } from '../event-bus/state';
import { WindowType } from '../types';

export function useRegisterWindow(type: WindowType) {
  const setWindow = useStore(selectors.setWindow);
  const removeWindow = useStore(selectors.removeWindow);
  const id = uuid();

  useEffect(() => {
    setWindow(id, type);

    const handleBeforeUnload = () => {
      console.log('calling unload with', id);
      removeWindow(id);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [id, removeWindow, setWindow, type]);
  return id;
}
