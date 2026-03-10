import { useCallback } from "react";
import { usePlayerStore, Track } from "@/stores/playerStore";
import { webPlayer } from "@/lib/webPlayer";

export function usePlayer() {
  const store = usePlayerStore();

  const playTrack = useCallback((track: Track) => {
    webPlayer.playTrack(track);
  }, []);

  const playTrackList = useCallback(
    (tracks: Track[], startIndex: number = 0) => {
      webPlayer.playTrackList(tracks, startIndex);
    },
    [],
  );

  const togglePlayPause = useCallback(() => {
    webPlayer.togglePlayPause();
  }, []);

  const skipToNext = useCallback(() => {
    webPlayer.skipToNext();
  }, []);

  const skipToPrevious = useCallback(() => {
    webPlayer.skipToPrevious();
  }, []);

  const seekTo = useCallback((position: number) => {
    webPlayer.seekTo(position);
  }, []);

  const setRepeatMode = useCallback(() => {
    store.cycleRepeatMode();
  }, []);

  const recordListenIfNeeded = useCallback(() => {
    // No-op on web for now
  }, []);

  return {
    playTrack,
    playTrackList,
    togglePlayPause,
    skipToNext,
    skipToPrevious,
    seekTo,
    setRepeatMode,
    recordListenIfNeeded,
    progress: { position: store.position, duration: store.duration, buffered: 0 },
    playbackState: { state: store.isPlaying ? "playing" : "paused" },
  };
}
