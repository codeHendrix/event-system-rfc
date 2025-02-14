import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { eventManager } from '../event-manager';
import { ConnectionMetadata, WindowType } from '../types';

const { broadcaster, eventTypes, getConnectionCountByType } = eventManager;
const { connection } = eventTypes;

export function useRegisterConnection(type: WindowType) {
  useEffect(() => {
    const id = uuid();
    const name = `${type} ${getConnectionCountByType(type)}`;
    const connectionMetadata: ConnectionMetadata = {
      id,
      name,
      type,
      highlighted: false,
    };

    broadcaster.emit(connection.register, connectionMetadata);
    const handleBeforeUnload = () => {
      broadcaster.emit(connection.unregister, { id });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      broadcaster.emit(connection.unregister, { id });
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [type]);
}
