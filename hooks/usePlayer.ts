import { useEffect, useCallback, useRef } from "react";
import TrackPlayer, {
  State,
  Event,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  RepeatMode,
  Capability,
} from "react-native-track-player";
import { usePlayerStore, Track } from "@/stores/playerStore";
import { useLibraryStore } from "@/stores/libraryStore";
import { useAuthStore } from "@/stores/authStore";
import { REPEAT_MODES } from "@/lib/constants";
import { shuffleArray } from "@/lib/helpers";

let isPlayerSetup = false;

async function setupPlayer() {
  if (isPlayerSetup) return;
  try {
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 5,
    });
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
    });
    isPlayerSetup = true;
  } catch {
    // Player already setup
    isPlayerSetup = true;
  }
}

export function usePlayer() {
  const store = usePlayerStore();
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const lastTrackIdRef = useRef<string | null>(null);

  useEffect(() => {
    setupPlayer();
  }, []);

  useEffect(() => {
    if (progress.position > 0) {
      store.setPosition(progress.position);
    }
    if (progress.duration > 0) {
      store.setDuration(progress.duration);
    }
  }, [progress.position, progress.duration]);

  useEffect(() => {
    const playing = playbackState.state === State.Playing;
    const buffering = playbackState.state === State.Buffering;
    store.setIsPlaying(playing);
    store.setIsBuffering(buffering);
  }, [playbackState.state]);

  useTrackPlayerEvents([Event.PlaybackQueueEnded], () => {
    if (store.repeatMode === REPEAT_MODES.ALL) {
      playTrackList(store.queue, 0);
    } else {
      store.setIsPlaying(false);
    }
  });

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (event.track) {
      const matchingTrack = store.queue.find(
        (t) => t.audio_url === event.track?.url,
      );
      if (matchingTrack && matchingTrack.id !== lastTrackIdRef.current) {
        lastTrackIdRef.current = matchingTrack.id;
        store.setCurrentTrack(matchingTrack);
      }
    }
  });

  const playTrack = useCallback(async (track: Track) => {
    await setupPlayer();
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: track.id,
      url: track.audio_url,
      title: track.title,
      artist: track.artist_name || "Unknown Artist",
      artwork: track.artwork_url || undefined,
      duration: track.duration,
    });
    store.setCurrentTrack(track);
    store.setQueue([track], 0);
    lastTrackIdRef.current = track.id;
    await TrackPlayer.play();
  }, []);

  const playTrackList = useCallback(
    async (tracks: Track[], startIndex: number = 0) => {
      await setupPlayer();
      let playTracks = tracks;
      let playIndex = startIndex;

      if (store.isShuffled) {
        const currentTrack = tracks[startIndex];
        const rest = tracks.filter((_, i) => i !== startIndex);
        playTracks = [currentTrack, ...shuffleArray(rest)];
        playIndex = 0;
      }

      await TrackPlayer.reset();
      await TrackPlayer.add(
        playTracks.map((t) => ({
          id: t.id,
          url: t.audio_url,
          title: t.title,
          artist: t.artist_name || "Unknown Artist",
          artwork: t.artwork_url || undefined,
          duration: t.duration,
        })),
      );

      store.setQueue(playTracks, playIndex);
      lastTrackIdRef.current = playTracks[playIndex]?.id ?? null;

      if (playIndex > 0) {
        await TrackPlayer.skip(playIndex);
      }
      await TrackPlayer.play();
    },
    [store.isShuffled],
  );

  const togglePlayPause = useCallback(async () => {
    const state = (await TrackPlayer.getPlaybackState()).state;
    if (state === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }, []);

  const skipToNext = useCallback(async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch {
      if (store.repeatMode === REPEAT_MODES.ALL) {
        await TrackPlayer.skip(0);
        await TrackPlayer.play();
      }
    }
  }, [store.repeatMode]);

  const skipToPrevious = useCallback(async () => {
    const pos = (await TrackPlayer.getProgress()).position;
    if (pos > 3) {
      await TrackPlayer.seekTo(0);
    } else {
      try {
        await TrackPlayer.skipToPrevious();
      } catch {
        await TrackPlayer.seekTo(0);
      }
    }
  }, []);

  const seekTo = useCallback(async (position: number) => {
    await TrackPlayer.seekTo(position);
  }, []);

  const setRepeatMode = useCallback(async () => {
    store.cycleRepeatMode();
    const nextMode = (() => {
      switch (store.repeatMode) {
        case REPEAT_MODES.OFF:
          return RepeatMode.Queue;
        case REPEAT_MODES.ALL:
          return RepeatMode.Track;
        case REPEAT_MODES.ONE:
          return RepeatMode.Off;
        default:
          return RepeatMode.Off;
      }
    })();
    await TrackPlayer.setRepeatMode(nextMode);
  }, [store.repeatMode]);

  const recordListenIfNeeded = useCallback(() => {
    const user = useAuthStore.getState().user;
    const track = store.currentTrack;
    if (user && track && progress.position > 30) {
      useLibraryStore
        .getState()
        .recordListen(user.id, track.id, Math.floor(progress.position));
    }
  }, [store.currentTrack, progress.position]);

  return {
    playTrack,
    playTrackList,
    togglePlayPause,
    skipToNext,
    skipToPrevious,
    seekTo,
    setRepeatMode,
    recordListenIfNeeded,
    progress,
    playbackState,
  };
}
