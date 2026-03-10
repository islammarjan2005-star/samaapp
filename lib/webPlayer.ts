import { usePlayerStore, Track } from "@/stores/playerStore";
import { REPEAT_MODES } from "@/lib/constants";
import { shuffleArray } from "@/lib/helpers";

let audio: HTMLAudioElement | null = null;
let animFrameId: number | null = null;

function getAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio();
    audio.addEventListener("ended", () => {
      const store = usePlayerStore.getState();
      if (store.repeatMode === REPEAT_MODES.ONE) {
        audio!.currentTime = 0;
        audio!.play();
      } else if (store.repeatMode === REPEAT_MODES.ALL) {
        const nextIndex =
          store.queueIndex + 1 >= store.queue.length ? 0 : store.queueIndex + 1;
        playFromQueue(nextIndex);
      } else if (store.queueIndex + 1 < store.queue.length) {
        playFromQueue(store.queueIndex + 1);
      } else {
        store.setIsPlaying(false);
      }
    });
    audio.addEventListener("loadedmetadata", () => {
      usePlayerStore.getState().setDuration(audio!.duration);
    });
    audio.addEventListener("waiting", () => {
      usePlayerStore.getState().setIsBuffering(true);
    });
    audio.addEventListener("canplay", () => {
      usePlayerStore.getState().setIsBuffering(false);
    });
  }
  return audio;
}

function startProgressLoop() {
  if (animFrameId !== null) cancelAnimationFrame(animFrameId);
  const tick = () => {
    if (audio && !audio.paused) {
      usePlayerStore.getState().setPosition(audio.currentTime);
    }
    animFrameId = requestAnimationFrame(tick);
  };
  animFrameId = requestAnimationFrame(tick);
}

function stopProgressLoop() {
  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }
}

function playFromQueue(index: number) {
  const store = usePlayerStore.getState();
  const track = store.queue[index];
  if (!track) return;
  const a = getAudio();
  a.src = track.audio_url;
  a.play();
  store.setCurrentTrack(track);
  usePlayerStore.setState({ queueIndex: index, position: 0 });
  store.setIsPlaying(true);
  startProgressLoop();
}

export const webPlayer = {
  playTrack(track: Track) {
    const store = usePlayerStore.getState();
    const a = getAudio();
    a.src = track.audio_url;
    a.play();
    store.setCurrentTrack(track);
    store.setQueue([track], 0);
    store.setIsPlaying(true);
    startProgressLoop();
  },

  playTrackList(tracks: Track[], startIndex: number = 0) {
    const store = usePlayerStore.getState();
    let playTracks = tracks;
    let playIndex = startIndex;

    if (store.isShuffled) {
      const current = tracks[startIndex];
      const rest = tracks.filter((_, i) => i !== startIndex);
      playTracks = [current, ...shuffleArray(rest)];
      playIndex = 0;
    }

    store.setQueue(playTracks, playIndex);
    playFromQueue(playIndex);
  },

  togglePlayPause() {
    const a = getAudio();
    const store = usePlayerStore.getState();
    if (a.paused) {
      a.play();
      store.setIsPlaying(true);
      startProgressLoop();
    } else {
      a.pause();
      store.setIsPlaying(false);
      stopProgressLoop();
    }
  },

  skipToNext() {
    const store = usePlayerStore.getState();
    let nextIndex = store.queueIndex + 1;
    if (nextIndex >= store.queue.length) {
      if (store.repeatMode === REPEAT_MODES.ALL) {
        nextIndex = 0;
      } else {
        return;
      }
    }
    playFromQueue(nextIndex);
  },

  skipToPrevious() {
    const a = getAudio();
    if (a.currentTime > 3) {
      a.currentTime = 0;
      return;
    }
    const store = usePlayerStore.getState();
    const prevIndex =
      store.queueIndex > 0 ? store.queueIndex - 1 : store.queue.length - 1;
    playFromQueue(prevIndex);
  },

  seekTo(position: number) {
    const a = getAudio();
    a.currentTime = position;
    usePlayerStore.getState().setPosition(position);
  },

  setVolume(volume: number) {
    getAudio().volume = volume;
    usePlayerStore.getState().setVolume(volume);
  },

  destroy() {
    stopProgressLoop();
    if (audio) {
      audio.pause();
      audio.src = "";
      audio = null;
    }
  },
};
