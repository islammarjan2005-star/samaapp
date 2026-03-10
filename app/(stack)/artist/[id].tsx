import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "@/lib/haptics";
import { supabase } from "@/lib/supabase";
import { COLORS, PLACEHOLDER_ARTWORK } from "@/lib/constants";
import { formatCount } from "@/lib/helpers";
import { Track } from "@/stores/playerStore";
import { usePlayer } from "@/hooks/usePlayer";
import { useLibraryStore } from "@/stores/libraryStore";
import { useAuthStore } from "@/stores/authStore";
import { TrackRow } from "@/components/track/TrackRow";
import { TrackRowSkeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HEADER_HEIGHT = 280;

interface Artist {
  id: string;
  name: string;
  bio: string | null;
  image_url: string | null;
  genre: string;
  followers_count: number;
}

interface Album {
  id: string;
  title: string;
  cover_url: string | null;
  release_year: number;
  category: string;
}

export default function ArtistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFollowing = useLibraryStore((s) => s.isFollowing(id));
  const toggleFollow = useLibraryStore((s) => s.toggleFollow);
  const user = useAuthStore((s) => s.user);
  const { playTrackList } = usePlayer();
  const router = useRouter();

  useEffect(() => {
    fetchArtist();
  }, [id]);

  const fetchArtist = async () => {
    const [artistRes, tracksRes, albumsRes] = await Promise.all([
      supabase.from("artists").select("*").eq("id", id).single(),
      supabase
        .from("tracks")
        .select("*, artists!inner(name)")
        .eq("artist_id", id)
        .order("plays_count", { ascending: false }),
      supabase
        .from("albums")
        .select("*")
        .eq("artist_id", id)
        .order("release_year", { ascending: false }),
    ]);

    if (artistRes.data) setArtist(artistRes.data);
    if (tracksRes.data) {
      setTracks(
        tracksRes.data.map((t: any) => ({ ...t, artist_name: t.artists?.name })),
      );
    }
    if (albumsRes.data) setAlbums(albumsRes.data);
    setIsLoading(false);
  };

  const handleFollow = () => {
    if (!user) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleFollow(user.id, id);
  };

  if (isLoading || !artist) {
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

            {/* Artist Image */}
            <Image
              source={{ uri: artist.image_url || PLACEHOLDER_ARTWORK }}
              style={{
                width: SCREEN_WIDTH,
                height: HEADER_HEIGHT,
                backgroundColor: COLORS.card,
              }}
              contentFit="cover"
              transition={300}
            />

            {/* Artist Info */}
            <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
              <Text
                style={{
                  color: COLORS.text,
                  fontSize: 28,
                  fontWeight: "800",
                }}
              >
                {artist.name}
              </Text>
              <Text
                style={{
                  color: COLORS.muted,
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                {formatCount(artist.followers_count)} followers · {artist.genre}
              </Text>
              {artist.bio && (
                <Text
                  style={{
                    color: COLORS.textSecondary,
                    fontSize: 14,
                    marginTop: 8,
                    lineHeight: 20,
                  }}
                >
                  {artist.bio}
                </Text>
              )}

              {/* Actions */}
              <View
                style={{
                  flexDirection: "row",
                  gap: 12,
                  marginTop: 16,
                  marginBottom: 8,
                }}
              >
                <Button
                  title={isFollowing ? "Following" : "Follow"}
                  onPress={handleFollow}
                  variant={isFollowing ? "secondary" : "primary"}
                  size="sm"
                />
                {tracks.length > 0 && (
                  <TouchableOpacity
                    onPress={() => playTrackList(tracks, 0)}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: COLORS.accent,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name="play"
                      size={20}
                      color={COLORS.white}
                      style={{ marginLeft: 2 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Albums */}
            {albums.length > 0 && (
              <>
                <Text
                  style={{
                    color: COLORS.text,
                    fontSize: 18,
                    fontWeight: "700",
                    paddingHorizontal: 16,
                    paddingTop: 20,
                    paddingBottom: 12,
                  }}
                >
                  Discography
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={albums}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        router.push(`/(stack)/album/${item.id}`)
                      }
                      style={{ width: 140 }}
                    >
                      <Image
                        source={{
                          uri: item.cover_url || PLACEHOLDER_ARTWORK,
                        }}
                        style={{
                          width: 140,
                          height: 140,
                          borderRadius: 10,
                          backgroundColor: COLORS.card,
                        }}
                        contentFit="cover"
                      />
                      <Text
                        numberOfLines={1}
                        style={{
                          color: COLORS.text,
                          fontSize: 13,
                          fontWeight: "500",
                          marginTop: 6,
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          color: COLORS.muted,
                          fontSize: 12,
                          marginTop: 2,
                        }}
                      >
                        {item.release_year}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </>
            )}

            {/* Popular Tracks Header */}
            <Text
              style={{
                color: COLORS.text,
                fontSize: 18,
                fontWeight: "700",
                paddingHorizontal: 16,
                paddingTop: 24,
                paddingBottom: 4,
              }}
            >
              Popular Tracks
            </Text>
          </>
        }
        renderItem={({ item, index }) => (
          <TrackRow
            track={item}
            index={index}
            showArtwork={false}
            onPress={() => playTrackList(tracks, index)}
          />
        )}
      />
    </SafeAreaView>
  );
}
