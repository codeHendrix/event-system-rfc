import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { SelectedEntity, WindowType } from '../types';
import { WindowsMap } from './types';
import { windowMetaDataGenerator } from './utils';
import superjson from 'superjson';
import { enableMapSet } from 'immer';
import { broadcaster, EVENTS } from './broadcaster';

export type AppState = {
  selectedEntity?: SelectedEntity;
  setSelectedEntity: (selectedEntity?: SelectedEntity) => void;
  // broadcaster: TabsBroadcast;
  windows: WindowsMap;
  setWindow: (id: string, type?: WindowType) => void;
  removeWindow: (id: string) => void;
};

enableMapSet();

const storage: PersistStorage<AppState> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return superjson.parse(str);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, superjson.stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

export const selectors = {
  selectedEntity: (state: AppState) => state.selectedEntity,
  setSelectedEntity: (state: AppState) => state.setSelectedEntity,
  windows: (state: AppState) => state.windows,
  setWindow: (state: AppState) => state.setWindow,
  removeWindow: (state: AppState) => state.removeWindow,
};

export const useStore = create<AppState>()(
  immer(
    persist(
      (set) => ({
        selectedEntity: undefined,
        setSelectedEntity: (newEntity?: SelectedEntity) => {
          set((state) => {
            const currentSelectedEntity = state.selectedEntity;

            if (currentSelectedEntity?.id === newEntity?.id) {
              return;
            }

            state.selectedEntity = newEntity;
          });
        },
        windows: new Map(),
        /* 
          Decided what I should create in component vs what should be handled in state function
          ie just pass the type and generate metadata inside registerWindow
        */
        setWindow: (id: string, type?: WindowType) => {
          set((state) => {
            const { windows } = state;

            if (windows.has(id)) {
              return;
            }

            const meta = windowMetaDataGenerator(windows)({ id, type });

            windows.set(id, meta);
          });
        },

        removeWindow: (id: string) => {
          set((state) => {
            const { windows } = state;
            console.log('calling removeWindow with', id, windows.has(id));

            if (windows.has(id)) {
              windows.delete(id);
            }
          });
        },
      }),
      {
        name: 'state',
        storage,
        version: Math.floor(Math.random() * 100),
      }
    )
  )
);

const { ui } = EVENTS;

// TODO: how to clean this up when all windows are closed? Also seems weird this is randomly at the bottom. Should be fine?
broadcaster.on(ui.bbcard.open, (data) => {
  const entity = data.payload;
  console.log(entity);
  useStore.getState().setSelectedEntity(entity);
});

broadcaster.on(ui.bbcard.close, () => useStore.getState().setSelectedEntity());
