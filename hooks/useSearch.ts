import { useState, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Track } from "@/stores/playerStore";

interface SearchResults {
  tracks: (Track & { artist_name: string })[];
  artists: { id: string; name: string; image_url: string | null; genre: string }[];
  albums: { id: string; title: string; cover_url: string | null; artist_name: string }[];
  playlists: { id: string; title: string; cover_url: string | null; description: string | null }[];
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    tracks: [],
    artists: [],
    albums: [],
    playlists: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults({ tracks: [], artists: [], albums: [], playlists: [] });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const term = `%${searchQuery.trim()}%`;

    const [tracksRes, artistsRes, albumsRes, playlistsRes] = await Promise.all([
      supabase
        .from("tracks")
        .select("*, artists!inner(name)")
        .ilike("title", term)
        .limit(10),
      supabase
        .from("artists")
        .select("id, name, image_url, genre")
        .ilike("name", term)
        .limit(5),
      supabase
        .from("albums")
        .select("id, title, cover_url, artists!inner(name)")
        .ilike("title", term)
        .limit(5),
      supabase
        .from("playlists")
        .select("id, title, cover_url, description")
        .eq("is_curated", true)
        .ilike("title", term)
        .limit(5),
    ]);

    setResults({
      tracks: (tracksRes.data || []).map((t: any) => ({
        ...t,
        artist_name: t.artists?.name || "Unknown",
      })),
      artists: artistsRes.data || [],
      albums: (albumsRes.data || []).map((a: any) => ({
        ...a,
        artist_name: a.artists?.name || "Unknown",
      })),
      playlists: playlistsRes.data || [],
    });
    setIsSearching(false);
  }, []);

  const handleQueryChange = useCallback(
    (text: string) => {
      setQuery(text);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => search(text), 300);
    },
    [search],
  );

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return {
    query,
    setQuery: handleQueryChange,
    results,
    isSearching,
    clearSearch: () => {
      setQuery("");
      setResults({ tracks: [], artists: [], albums: [], playlists: [] });
    },
  };
}
