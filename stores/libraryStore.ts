import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { Track } from "./playerStore";

interface LibraryState {
  likedTrackIds: Set<string>;
  followedArtistIds: Set<string>;
  userPlaylists: Playlist[];
  listeningHistory: HistoryEntry[];
  isLoading: boolean;

  fetchLikes: (userId: string) => Promise<void>;
  toggleLike: (userId: string, trackId: string) => Promise<void>;
  isLiked: (trackId: string) => boolean;
  fetchFollows: (userId: string) => Promise<void>;
  toggleFollow: (userId: string, artistId: string) => Promise<void>;
  isFollowing: (artistId: string) => boolean;
  fetchPlaylists: (userId: string) => Promise<void>;
  createPlaylist: (
    userId: string,
    title: string,
    description?: string,
  ) => Promise<string | null>;
  addTrackToPlaylist: (playlistId: string, trackId: string) => Promise<void>;
  removeTrackFromPlaylist: (
    playlistId: string,
    trackId: string,
  ) => Promise<void>;
  recordListen: (userId: string, trackId: string, duration: number) => Promise<void>;
  fetchHistory: (userId: string) => Promise<void>;
}

export interface Playlist {
  id: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  user_id: string | null;
  is_curated: boolean;
  track_count?: number;
}

interface HistoryEntry {
  id: string;
  track_id: string;
  played_at: string;
  track?: Track;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  likedTrackIds: new Set(),
  followedArtistIds: new Set(),
  userPlaylists: [],
  listeningHistory: [],
  isLoading: false,

  fetchLikes: async (userId) => {
    const { data } = await supabase
      .from("likes")
      .select("track_id")
      .eq("user_id", userId);
    if (data) {
      set({ likedTrackIds: new Set(data.map((l) => l.track_id)) });
    }
  },

  toggleLike: async (userId, trackId) => {
    const { likedTrackIds } = get();
    const isCurrentlyLiked = likedTrackIds.has(trackId);

    // Optimistic update
    const newLikes = new Set(likedTrackIds);
    if (isCurrentlyLiked) {
      newLikes.delete(trackId);
    } else {
      newLikes.add(trackId);
    }
    set({ likedTrackIds: newLikes });

    if (isCurrentlyLiked) {
      await supabase
        .from("likes")
        .delete()
        .eq("user_id", userId)
        .eq("track_id", trackId);
    } else {
      await supabase.from("likes").insert({ user_id: userId, track_id: trackId });
    }
  },

  isLiked: (trackId) => get().likedTrackIds.has(trackId),

  fetchFollows: async (userId) => {
    const { data } = await supabase
      .from("follows")
      .select("artist_id")
      .eq("user_id", userId);
    if (data) {
      set({ followedArtistIds: new Set(data.map((f) => f.artist_id)) });
    }
  },

  toggleFollow: async (userId, artistId) => {
    const { followedArtistIds } = get();
    const isCurrentlyFollowing = followedArtistIds.has(artistId);

    const newFollows = new Set(followedArtistIds);
    if (isCurrentlyFollowing) {
      newFollows.delete(artistId);
    } else {
      newFollows.add(artistId);
    }
    set({ followedArtistIds: newFollows });

    if (isCurrentlyFollowing) {
      await supabase
        .from("follows")
        .delete()
        .eq("user_id", userId)
        .eq("artist_id", artistId);
    } else {
      await supabase.from("follows").insert({ user_id: userId, artist_id: artistId });
    }
  },

  isFollowing: (artistId) => get().followedArtistIds.has(artistId),

  fetchPlaylists: async (userId) => {
    const { data } = await supabase
      .from("playlists")
      .select("*")
      .or(`user_id.eq.${userId},is_curated.eq.true`)
      .order("created_at", { ascending: false });
    if (data) {
      set({ userPlaylists: data });
    }
  },

  createPlaylist: async (userId, title, description) => {
    const { data } = await supabase
      .from("playlists")
      .insert({
        title,
        description: description || null,
        user_id: userId,
        is_curated: false,
      })
      .select()
      .single();
    if (data) {
      set((state) => ({ userPlaylists: [data, ...state.userPlaylists] }));
      return data.id;
    }
    return null;
  },

  addTrackToPlaylist: async (playlistId, trackId) => {
    const { data: existing } = await supabase
      .from("playlist_tracks")
      .select("id")
      .eq("playlist_id", playlistId)
      .eq("track_id", trackId)
      .single();
    if (existing) return;

    const { data: maxPos } = await supabase
      .from("playlist_tracks")
      .select("position")
      .eq("playlist_id", playlistId)
      .order("position", { ascending: false })
      .limit(1)
      .single();

    await supabase.from("playlist_tracks").insert({
      playlist_id: playlistId,
      track_id: trackId,
      position: (maxPos?.position ?? -1) + 1,
    });
  },

  removeTrackFromPlaylist: async (playlistId, trackId) => {
    await supabase
      .from("playlist_tracks")
      .delete()
      .eq("playlist_id", playlistId)
      .eq("track_id", trackId);
  },

  recordListen: async (userId, trackId, duration) => {
    await supabase.from("listening_history").insert({
      user_id: userId,
      track_id: trackId,
      duration_listened: duration,
    });
  },

  fetchHistory: async (userId) => {
    const { data } = await supabase
      .from("listening_history")
      .select("*")
      .eq("user_id", userId)
      .order("played_at", { ascending: false })
      .limit(50);
    if (data) {
      set({ listeningHistory: data });
    }
  },
}));
