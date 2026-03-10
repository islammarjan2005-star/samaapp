import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Track } from "@/stores/playerStore";
import { useAuthStore } from "@/stores/authStore";
import { useLibraryStore } from "@/stores/libraryStore";

export function useLibrary() {
  const user = useAuthStore((s) => s.user);
  const { likedTrackIds, userPlaylists, fetchPlaylists } = useLibraryStore();
  const [likedTracks, setLikedTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLikedTracks = useCallback(async () => {
    if (!user || likedTrackIds.size === 0) {
      setLikedTracks([]);
      return;
    }
    setIsLoading(true);
    const { data } = await supabase
      .from("tracks")
      .select("*, artists!inner(name)")
      .in("id", Array.from(likedTrackIds));

    if (data) {
      setLikedTracks(
        data.map((t: any) => ({ ...t, artist_name: t.artists?.name })),
      );
    }
    setIsLoading(false);
  }, [user, likedTrackIds]);

  useEffect(() => {
    fetchLikedTracks();
  }, [fetchLikedTracks]);

  useEffect(() => {
    if (user) fetchPlaylists(user.id);
  }, [user]);

  return {
    likedTracks,
    userPlaylists,
    isLoading,
    refreshLikedTracks: fetchLikedTracks,
  };
}
