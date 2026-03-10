import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, CATEGORIES, PLACEHOLDER_ARTWORK } from "@/lib/constants";
import { useSearch } from "@/hooks/useSearch";
import { usePlayer } from "@/hooks/usePlayer";
import { TrackRow } from "@/components/track/TrackRow";

const CATEGORY_COLORS = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

export default function SearchScreen() {
  const { query, setQuery, results, isSearching, clearSearch } = useSearch();
  const { playTrack } = usePlayer();
  const router = useRouter();
  const hasResults =
    results.tracks.length > 0 ||
    results.artists.length > 0 ||
    results.albums.length > 0 ||
    results.playlists.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
        <Text
          style={{
            color: COLORS.text,
            fontSize: 26,
            fontWeight: "800",
            marginBottom: 16,
          }}
        >
          Search
        </Text>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.card,
            borderRadius: 12,
            paddingHorizontal: 14,
            gap: 10,
          }}
        >
          <Ionicons name="search" size={20} color={COLORS.muted} />
          <TextInput
            placeholder="Search tracks, artists, albums..."
            placeholderTextColor={COLORS.muted}
            value={query}
            onChangeText={setQuery}
            style={{
              flex: 1,
              color: COLORS.text,
              fontSize: 16,
              paddingVertical: 12,
            }}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color={COLORS.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isSearching && (
        <ActivityIndicator
          size="small"
          color={COLORS.accent}
          style={{ marginTop: 20 }}
        />
      )}

      {/* Search Results */}
      {query.length > 0 && hasResults && (
        <FlatList
          data={[]}
          renderItem={null}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <>
              {/* Artists */}
              {results.artists.length > 0 && (
                <>
                  <Text
                    style={{
                      color: COLORS.text,
                      fontSize: 18,
                      fontWeight: "700",
                      paddingHorizontal: 16,
                      paddingTop: 16,
                      paddingBottom: 8,
                    }}
                  >
                    Artists
                  </Text>
                  {results.artists.map((artist) => (
                    <TouchableOpacity
                      key={artist.id}
                      onPress={() =>
                        router.push(`/(stack)/artist/${artist.id}`)
                      }
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        gap: 12,
                      }}
                    >
                      <Image
                        source={{
                          uri: artist.image_url || PLACEHOLDER_ARTWORK,
                        }}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 24,
                          backgroundColor: COLORS.card,
                        }}
                        contentFit="cover"
                      />
                      <View>
                        <Text
                          style={{
                            color: COLORS.text,
                            fontSize: 15,
                            fontWeight: "500",
                          }}
                        >
                          {artist.name}
                        </Text>
                        <Text
                          style={{
                            color: COLORS.muted,
                            fontSize: 13,
                            marginTop: 1,
                          }}
                        >
                          Artist · {artist.genre}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </>
              )}

              {/* Tracks */}
              {results.tracks.length > 0 && (
                <>
                  <Text
                    style={{
                      color: COLORS.text,
                      fontSize: 18,
                      fontWeight: "700",
                      paddingHorizontal: 16,
                      paddingTop: 16,
                      paddingBottom: 8,
                    }}
                  >
                    Tracks
                  </Text>
                  {results.tracks.map((track) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      onPress={() => playTrack(track)}
                    />
                  ))}
                </>
              )}

              {/* Albums */}
              {results.albums.length > 0 && (
                <>
                  <Text
                    style={{
                      color: COLORS.text,
                      fontSize: 18,
                      fontWeight: "700",
                      paddingHorizontal: 16,
                      paddingTop: 16,
                      paddingBottom: 8,
                    }}
                  >
                    Albums
                  </Text>
                  {results.albums.map((album) => (
                    <TouchableOpacity
                      key={album.id}
                      onPress={() =>
                        router.push(`/(stack)/album/${album.id}`)
                      }
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        gap: 12,
                      }}
                    >
                      <Image
                        source={{
                          uri: album.cover_url || PLACEHOLDER_ARTWORK,
                        }}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 6,
                          backgroundColor: COLORS.card,
                        }}
                        contentFit="cover"
                      />
                      <View>
                        <Text
                          style={{
                            color: COLORS.text,
                            fontSize: 15,
                            fontWeight: "500",
                          }}
                        >
                          {album.title}
                        </Text>
                        <Text
                          style={{
                            color: COLORS.muted,
                            fontSize: 13,
                            marginTop: 1,
                          }}
                        >
                          Album · {album.artist_name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </>
          }
        />
      )}

      {/* Category Browse (when no search) */}
      {query.length === 0 && (
        <View style={{ flex: 1, paddingTop: 8 }}>
          <Text
            style={{
              color: COLORS.text,
              fontSize: 18,
              fontWeight: "700",
              paddingHorizontal: 16,
              paddingBottom: 12,
            }}
          >
            Browse Categories
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 12,
              gap: 10,
            }}
          >
            {CATEGORIES.map((cat, index) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() =>
                  router.push(
                    `/(tabs)/search?category=${cat.id}` as any,
                  )
                }
                style={{
                  width: "47%",
                  height: 100,
                  borderRadius: 12,
                  backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] + "20",
                  borderWidth: 1,
                  borderColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] + "40",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Ionicons
                  name={
                    cat.id === "nasheeds"
                      ? "musical-notes"
                      : cat.id === "quran"
                        ? "book"
                        : cat.id === "anasheed"
                          ? "mic"
                          : cat.id === "devotional"
                            ? "heart"
                            : "moon"
                  }
                  size={28}
                  color={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                />
                <Text
                  style={{
                    color: COLORS.text,
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* No results */}
      {query.length > 1 && !isSearching && !hasResults && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 100,
          }}
        >
          <Ionicons name="search-outline" size={48} color={COLORS.muted} />
          <Text
            style={{
              color: COLORS.muted,
              fontSize: 16,
              marginTop: 12,
            }}
          >
            No results found for "{query}"
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
