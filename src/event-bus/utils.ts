import { WindowMetadata, WindowType } from '../types';
import { WindowsMap } from './types';

const getWindowCountByType = (windows: WindowsMap, type?: WindowType) =>
  Array.from(windows.values()).filter((conn) => conn.type === type).length;

export const windowMetaDataGenerator = (windows: WindowsMap) => {
  return ({
    id,
    type,
  }: Pick<WindowMetadata, 'id' | 'type'>): WindowMetadata => {
    const count = getWindowCountByType(windows, type);
    const name = `${type} ${count + 1}`;
    return { id, type, name, highlighted: false };
  };
};
