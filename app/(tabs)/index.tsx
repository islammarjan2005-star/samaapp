import { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { COLORS, PLACEHOLDER_ARTWORK } from "@/lib/constants";
import { useAuthStore } from "@/stores/authStore";
import { Track } from "@/stores/playerStore";
import { usePlayer } from "@/hooks/usePlayer";
import { TrackCard } from "@/components/track/TrackCard";
import { TrackRow } from "@/components/track/TrackRow";
import { CardSkeleton, TrackRowSkeleton } from "@/components/ui/Skeleton";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { Ionicons } from "@expo/vector-icons";

interface Album {
  id: string;
  title: string;
  cover_url: string | null;
  artist_id: string;
  category: string;
  artists: { name: string };
}

interface Artist {
  id: string;
  name: string;
  image_url: string | null;
  genre: string;
}

interface Playlist {
  id: string;
  title: string;
  cover_url: string | null;
  description: string | null;
}

export default function HomeScreen() {
  const [featuredTracks, setFeaturedTracks] = useState<Track[]>([]);
  const [trendingAlbums, setTrendingAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [curatedPlaylists, setCuratedPlaylists] = useState<Playlist[]>([]);
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const profile = useAuthStore((s) => s.profile);
  const { playTrack, playTrackList } = usePlayer();
  const router = useRouter();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }, []);

  const fetchData = useCallback(async () => {
    const categories = profile?.preferred_categories;
    const categoryFilter = categories && categories.length > 0 ? categories : null;

    const [tracksRes, albumsRes, artistsRes, playlistsRes] = await Promise.all([
      supabase
        .from("tracks")
        .select("*, artists!inner(name)")
        .order("plays_count", { ascending: false })
        .limit(10),
      supabase
        .from("albums")
        .select("*, artists!inner(name)")
        .order("created_at", { ascending: false })
        .limit(8),
      supabase
        .from("artists")
        .select("*")
        .order("followers_count", { ascending: false })
        .limit(6),
      supabase
        .from("playlists")
        .select("*")
        .eq("is_curated", true)
        .limit(4),
    ]);

    if (tracksRes.data) {
      let tracks = tracksRes.data.map((t: any) => ({
        ...t,
        artist_name: t.artists?.name,
      }));
      if (categoryFilter) {
        const filtered = tracks.filter((t: Track) =>
          categoryFilter.includes(t.category),
        );
        tracks = filtered.length > 0 ? filtered : tracks;
      }
      setFeaturedTracks(tracks);
      setRecentTracks(tracks.slice(0, 5));
    }
    if (albumsRes.data) setTrendingAlbums(albumsRes.data as any);
    if (artistsRes.data) setArtists(artistsRes.data);
    if (playlistsRes.data) setCuratedPlaylists(playlistsRes.data);
  }, [profile?.preferred_categories]);

  useEffect(() => {
    fetchData().finally(() => setIsLoading(false));
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const renderSection = (title: string, onSeeAll?: () => void) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 28,
        marginBottom: 12,
      }}
    >
      <Text style={{ color: COLORS.text, fontSize: 20, fontWeight: "700" }}>
        {title}
      </Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={{ color: COLORS.accent, fontSize: 14, fontWeight: "600" }}>
            See All
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
        <View style={{ padding: 16, gap: 24 }}>
          <View style={{ gap: 12 }}>
            {[...Array(3)].map((_, i) => (
              <TrackRowSkeleton key={i} />
            ))}
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            {[...Array(3)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.accent}
          />
        }
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <GeometricPattern
          width={300}
          height={300}
          opacity={0.03}
          style={{ top: -50, right: -50 }}
        />

        {/* Header */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
          <Text style={{ color: COLORS.muted, fontSize: 14 }}>{greeting}</Text>
          <Text
            style={{
              color: COLORS.text,
              fontSize: 26,
              fontWeight: "800",
              marginTop: 2,
            }}
          >
            {profile?.display_name || "Welcome to Sama"}
          </Text>
        </View>

        {/* Curated Playlists */}
        {curatedPlaylists.length > 0 && (
          <>
            {renderSection("For You")}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={curatedPlaylists}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => router.push(`/(stack)/playlist/${item.id}`)}
                  activeOpacity={0.7}
                  style={{ width: 165 }}
                >
                  <Image
                    source={{ uri: item.cover_url || PLACEHOLDER_ARTWORK }}
                    style={{
                      width: 165,
                      height: 165,
                      borderRadius: 12,
                      backgroundColor: COLORS.card,
                    }}
                    contentFit="cover"
                    transition={200}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: COLORS.text,
                      fontSize: 14,
                      fontWeight: "600",
                      marginTop: 8,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ color: COLORS.muted, fontSize: 12, marginTop: 2 }}
                  >
                    {item.description}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </>
        )}

        {/* Featured Tracks */}
        {featuredTracks.length > 0 && (
          <>
            {renderSection("Trending Now")}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={featuredTracks.slice(0, 6)}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}
              renderItem={({ item, index }) => (
                <TrackCard
                  track={item}
                  onPress={() => playTrackList(featuredTracks, index)}
                />
              )}
            />
          </>
        )}

        {/* Popular Artists */}
        {artists.length > 0 && (
          <>
            {renderSection("Popular Artists")}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={artists}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => router.push(`/(stack)/artist/${item.id}`)}
                  activeOpacity={0.7}
                  style={{ alignItems: "center", width: 100 }}
                >
                  <Image
                    source={{ uri: item.image_url || PLACEHOLDER_ARTWORK }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      backgroundColor: COLORS.card,
                    }}
                    contentFit="cover"
                    transition={200}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: COLORS.text,
                      fontSize: 13,
                      fontWeight: "500",
                      marginTop: 8,
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </>
        )}

        {/* Albums */}
        {trendingAlbums.length > 0 && (
          <>
            {renderSection("New Releases")}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={trendingAlbums}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => router.push(`/(stack)/album/${item.id}`)}
                  activeOpacity={0.7}
                  style={{ width: 150 }}
                >
                  <Image
                    source={{ uri: item.cover_url || PLACEHOLDER_ARTWORK }}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 12,
                      backgroundColor: COLORS.card,
                    }}
                    contentFit="cover"
                    transition={200}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: COLORS.text,
                      fontSize: 14,
                      fontWeight: "500",
                      marginTop: 8,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ color: COLORS.muted, fontSize: 12, marginTop: 2 }}
                  >
                    {item.artists?.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </>
        )}

        {/* Recently Played */}
        {recentTracks.length > 0 && (
          <>
            {renderSection("Recently Played")}
            {recentTracks.map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                index={index}
                onPress={() => playTrackList(recentTracks, index)}
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
