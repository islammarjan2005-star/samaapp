import { create } from "zustand";
import { RepeatMode, REPEAT_MODES } from "@/lib/constants";

export interface Track {
  id: string;
  title: string;
  artist_id: string;
  album_id: string;
  audio_url: string;
  artwork_url: string | null;
  duration: number;
  track_number: number;
  category: string;
  plays_count: number;
  artist_name?: string;
  album_title?: string;
}

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  queueIndex: number;
  isPlaying: boolean;
  isBuffering: boolean;
  position: number;
  duration: number;
  volume: number;
  repeatMode: RepeatMode;
  isShuffled: boolean;
  isPlayerVisible: boolean;
  isFullPlayerOpen: boolean;

  setCurrentTrack: (track: Track) => void;
  setQueue: (tracks: Track[], startIndex?: number) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  reorderQueue: (fromIndex: number, toIndex: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  setIsBuffering: (buffering: boolean) => void;
  setPosition: (position: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  setIsFullPlayerOpen: (open: boolean) => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  queueIndex: 0,
  isPlaying: false,
  isBuffering: false,
  position: 0,
  duration: 0,
  volume: 1,
  repeatMode: REPEAT_MODES.OFF,
  isShuffled: false,
  isPlayerVisible: false,
  isFullPlayerOpen: false,

  setCurrentTrack: (track) =>
    set({ currentTrack: track, isPlayerVisible: true, position: 0 }),

  setQueue: (tracks, startIndex = 0) =>
    set({
      queue: tracks,
      queueIndex: startIndex,
      currentTrack: tracks[startIndex] || null,
      isPlayerVisible: tracks.length > 0,
      position: 0,
    }),

  addToQueue: (track) =>
    set((state) => ({ queue: [...state.queue, track] })),

  removeFromQueue: (index) =>
    set((state) => {
      const newQueue = [...state.queue];
      newQueue.splice(index, 1);
      const newIndex =
        index < state.queueIndex
          ? state.queueIndex - 1
          : state.queueIndex;
      return { queue: newQueue, queueIndex: Math.max(0, newIndex) };
    }),

  reorderQueue: (fromIndex, toIndex) =>
    set((state) => {
      const newQueue = [...state.queue];
      const [moved] = newQueue.splice(fromIndex, 1);
      newQueue.splice(toIndex, 0, moved);
      let newIndex = state.queueIndex;
      if (fromIndex === state.queueIndex) {
        newIndex = toIndex;
      } else if (
        fromIndex < state.queueIndex &&
        toIndex >= state.queueIndex
      ) {
        newIndex--;
      } else if (
        fromIndex > state.queueIndex &&
        toIndex <= state.queueIndex
      ) {
        newIndex++;
      }
      return { queue: newQueue, queueIndex: newIndex };
    }),

  playNext: () => {
    const { queue, queueIndex, repeatMode } = get();
    if (queue.length === 0) return;
    let nextIndex = queueIndex + 1;
    if (nextIndex >= queue.length) {
      if (repeatMode === REPEAT_MODES.ALL) {
        nextIndex = 0;
      } else {
        set({ isPlaying: false });
        return;
      }
    }
    set({
      queueIndex: nextIndex,
      currentTrack: queue[nextIndex],
      position: 0,
      isPlaying: true,
    });
  },

  playPrevious: () => {
    const { queue, queueIndex, position } = get();
    if (queue.length === 0) return;
    if (position > 3) {
      set({ position: 0 });
      return;
    }
    const prevIndex = queueIndex > 0 ? queueIndex - 1 : queue.length - 1;
    set({
      queueIndex: prevIndex,
      currentTrack: queue[prevIndex],
      position: 0,
      isPlaying: true,
    });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setIsBuffering: (buffering) => set({ isBuffering: buffering }),
  setPosition: (position) => set({ position }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  toggleShuffle: () => set((state) => ({ isShuffled: !state.isShuffled })),

  cycleRepeatMode: () =>
    set((state) => {
      const modes: RepeatMode[] = [
        REPEAT_MODES.OFF,
        REPEAT_MODES.ALL,
        REPEAT_MODES.ONE,
      ];
      const currentIndex = modes.indexOf(state.repeatMode);
      return { repeatMode: modes[(currentIndex + 1) % modes.length] };
    }),

  setIsFullPlayerOpen: (open) => set({ isFullPlayerOpen: open }),

  reset: () =>
    set({
      currentTrack: null,
      queue: [],
      queueIndex: 0,
      isPlaying: false,
      isBuffering: false,
      position: 0,
      duration: 0,
      isPlayerVisible: false,
      isFullPlayerOpen: false,
    }),
}));
