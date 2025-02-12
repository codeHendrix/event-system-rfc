import { create } from 'zustand';

interface ChannelStore {
  selectedChannel: 'broadcast' | 'sharedWorker';
  setSelectedChannel: (channel: 'broadcast' | 'sharedWorker') => void;
}

export const useChannelStore = create<ChannelStore>((set) => ({
  selectedChannel: 'broadcast',
  setSelectedChannel: (channel) => set({ selectedChannel: channel }),
}));
