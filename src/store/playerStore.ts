import { create } from 'zustand';
import type { AVPlaybackStatus } from 'expo-av';
import { getSongStream } from '@api/musicApi';
import { loadAndPlay, pause, resume, seekTo, unloadPlayer } from '@services/playerService';
import type { MusicSong } from '@app-types/music.types';

type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused';

interface PlayerState {
  current?: MusicSong;
  queue: MusicSong[];
  queueIndex: number;
  status: PlayerStatus;
  position: number;
  duration: number;
  isSeeking: boolean;
  error?: string;
  playSong: (song: MusicSong, queue?: MusicSong[], queueIndex?: number) => Promise<void>;
  playNext: () => Promise<void>;
  playPrevious: () => Promise<void>;
  togglePlayPause: () => Promise<void>;
  seek: (positionMillis: number) => Promise<void>;
  skipForward10: () => Promise<void>;
  skipBackward10: () => Promise<void>;
  clear: () => Promise<void>;
  handleStatusUpdate: (status: AVPlaybackStatus) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  current: undefined,
  queue: [],
  queueIndex: -1,
  status: 'idle',
  position: 0,
  duration: 0,
  isSeeking: false,
  error: undefined,

  playSong: async (song: MusicSong, queue?: MusicSong[], queueIndex?: number) => {
    try {
      const q = queue ?? [song];
      const idx = queueIndex ?? 0;
      set({
        status: 'loading',
        current: song,
        queue: q,
        queueIndex: idx,
        error: undefined,
        position: 0,
        duration: 0,
      });
      const { streamUrl } = await getSongStream(song.id);
      await loadAndPlay(streamUrl, get().handleStatusUpdate);
    } catch (error: any) {
      set({
        status: 'idle',
        error: error?.message ?? 'Unable to play this song.',
      });
    }
  },

  playNext: async () => {
    const { queue, queueIndex } = get();
    if (queue.length === 0 || queueIndex < 0 || queueIndex >= queue.length - 1) return;
    const next = queue[queueIndex + 1];
    await get().playSong(next, queue, queueIndex + 1);
  },

  playPrevious: async () => {
    const { queue, queueIndex, position } = get();
    if (position > 3000) {
      await seekTo(0);
      set({ position: 0 });
      return;
    }
    if (queue.length === 0 || queueIndex <= 0) return;
    const prev = queue[queueIndex - 1];
    await get().playSong(prev, queue, queueIndex - 1);
  },

  togglePlayPause: async () => {
    const { status } = get();
    if (status === 'playing') {
      await pause();
      set({ status: 'paused' });
    } else if (status === 'paused') {
      await resume();
      set({ status: 'playing' });
    }
  },

  seek: async (positionMillis: number) => {
    set({ isSeeking: true });
    await seekTo(positionMillis);
    set({ isSeeking: false, position: positionMillis });
  },

  skipForward10: async () => {
    const { position, duration } = get();
    const next = Math.min(position + 10000, duration || 0);
    await seekTo(next);
    set({ position: next });
  },

  skipBackward10: async () => {
    const { position } = get();
    const next = Math.max(position - 10000, 0);
    await seekTo(next);
    set({ position: next });
  },

  clear: async () => {
    await unloadPlayer();
    set({
      current: undefined,
      queue: [],
      queueIndex: -1,
      status: 'idle',
      position: 0,
      duration: 0,
      error: undefined,
    });
  },

  handleStatusUpdate: (status: AVPlaybackStatus) => {
    if (!('isLoaded' in status) || !status.isLoaded) {
      if (status.error) {
        set({ error: status.error, status: 'idle' });
      }
      return;
    }

    const { positionMillis, durationMillis, isPlaying } = status;

    set((state) => ({
      ...state,
      position: positionMillis ?? state.position,
      duration: durationMillis ?? state.duration,
      status: isPlaying ? 'playing' : state.status === 'loading' ? 'playing' : 'paused',
    }));
  },
}));

