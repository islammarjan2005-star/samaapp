import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { COLORS, PLACEHOLDER_ARTWORK } from "@/lib/constants";
import { Track } from "@/stores/playerStore";
import { usePlayer } from "@/hooks/usePlayer";
import { TrackRow } from "@/components/track/TrackRow";
import { TrackRowSkeleton } from "@/components/ui/Skeleton";
import { Playlist } from "@/stores/libraryStore";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function PlaylistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playTrackList } = usePlayer();
  const router = useRouter();

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  const fetchPlaylist = async () => {
    const [playlistRes, tracksRes] = await Promise.all([
      supabase.from("playlists").select("*").eq("id", id).single(),
      supabase
        .from("playlist_tracks")
        .select("*, tracks!inner(*, artists!inner(name))")
        .eq("playlist_id", id)
        .order("position"),
    ]);

    if (playlistRes.data) setPlaylist(playlistRes.data);
    if (tracksRes.data) {
      setTracks(
        tracksRes.data.map((pt: any) => ({
          ...pt.tracks,
          artist_name: pt.tracks.artists?.name,
        })),
      );
    }
    setIsLoading(false);
  };

  if (isLoading || !playlist) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
        <View style={{ padding: 16 }}>
          {[...Array(5)].map((_, i) => (
            <TrackRowSkeleton key={i} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  const ARTWORK_SIZE = SCREEN_WIDTH * 0.5;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            {/* Back button */}
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                position: "absolute",
                top: 8,
                left: 16,
                zIndex: 10,
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: COLORS.bg + "99",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="arrow-back" size={22} color={COLORS.text} />
            </TouchableOpacity>

            {/* Playlist Art + Info */}
            <View
              style={{
                alignItems: "center",
                paddingTop: 48,
                paddingBottom: 16,
              }}
            >
              <Image
                source={{ uri: playlist.cover_url || PLACEHOLDER_ARTWORK }}
                style={{
                  width: ARTWORK_SIZE,
                  height: ARTWORK_SIZE,
                  borderRadius: 12,
                  backgroundColor: COLORS.card,
                }}
                contentFit="cover"
                transition={300}
              />
              <Text
                style={{
                  color: COLORS.text,
                  fontSize: 22,
                  fontWeight: "700",
                  marginTop: 16,
                  textAlign: "center",
                  paddingHorizontal: 32,
                }}
              >
                {playlist.title}
              </Text>
              {playlist.description && (
                <Text
                  style={{
                    color: COLORS.muted,
                    fontSize: 14,
                    marginTop: 4,
                    textAlign: "center",
                    paddingHorizontal: 40,
                  }}
                >
                  {playlist.description}
                </Text>
              )}
              <Text
                style={{
                  color: COLORS.muted,
                  fontSize: 13,
                  marginTop: 8,
                }}
              >
                {tracks.length} tracks
              </Text>

              {/* Play All */}
              {tracks.length > 0 && (
                <TouchableOpacity
                  onPress={() => playTrackList(tracks, 0)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    backgroundColor: COLORS.accent,
                    paddingHorizontal: 32,
                    paddingVertical: 12,
                    borderRadius: 24,
                    marginTop: 16,
                  }}
                >
                  <Ionicons name="play" size={20} color={COLORS.white} />
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Play All
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        }
        renderItem={({ item, index }) => (
          <TrackRow
            track={item}
            index={index}
            onPress={() => playTrackList(tracks, index)}
          />
        )}
      />
    </SafeAreaView>
  );
}
