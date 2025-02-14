import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { eventManager } from './event-manager';

export type AppState = {
  activeId?: string;
  setActiveId: (id?: string) => void;
};

export const selectors = {
  activeId: (state: AppState) => state.activeId,
  setActiveId: (state: AppState) => state.setActiveId,
};

export const useStore = create<AppState>()(
  immer(
    persist(
      (set) => ({
        activeId: undefined,
        setActiveId: (activeId?: string) => {
          set((state) => {
            (state as AppState).activeId = activeId;
          });
        },
      }),
      {
        name: 'state',
      }
    )
  )
);

const { broadcaster, eventTypes } = eventManager;
const { ui } = eventTypes;

// TODO: how to clean this up when all windows are closed? Also seems weird this is randomly at the bottom. Should be fine?
broadcaster.on(ui.bbcard.open, (data) => {
  const { id } = data.payload;
  useStore.getState().setActiveId(id);
});

broadcaster.on(ui.bbcard.close, () => useStore.getState().setActiveId());
