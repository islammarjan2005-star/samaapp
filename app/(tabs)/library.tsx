import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, PLACEHOLDER_ARTWORK } from "@/lib/constants";
import { useLibrary } from "@/hooks/useLibrary";
import { usePlayer } from "@/hooks/usePlayer";
import { TrackRow } from "@/components/track/TrackRow";
import { TrackRowSkeleton } from "@/components/ui/Skeleton";
import { useAuthStore } from "@/stores/authStore";

type Tab = "liked" | "playlists" | "artists";

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("liked");
  const { likedTracks, userPlaylists, isLoading } = useLibrary();
  const { playTrackList } = usePlayer();
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  const tabs: { id: Tab; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: "liked", label: "Liked Songs", icon: "heart" },
    { id: "playlists", label: "Playlists", icon: "list" },
    { id: "artists", label: "Artists", icon: "people" },
  ];

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="library-outline" size={64} color={COLORS.muted} />
          <Text
            style={{
              color: COLORS.text,
              fontSize: 20,
              fontWeight: "700",
              marginTop: 16,
            }}
          >
            Your Library
          </Text>
          <Text
            style={{
              color: COLORS.muted,
              fontSize: 15,
              marginTop: 8,
              textAlign: "center",
              paddingHorizontal: 40,
            }}
          >
            Sign in to save your favorite songs and create playlists
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            style={{
              backgroundColor: COLORS.accent,
              paddingHorizontal: 32,
              paddingVertical: 12,
              borderRadius: 24,
              marginTop: 24,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
        <Text
          style={{
            color: COLORS.text,
            fontSize: 26,
            fontWeight: "800",
          }}
        >
          Your Library
        </Text>
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 16,
          gap: 8,
          paddingVertical: 8,
        }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor:
                activeTab === tab.id ? COLORS.accent : COLORS.card,
            }}
          >
            <Ionicons
              name={tab.icon}
              size={16}
              color={activeTab === tab.id ? COLORS.white : COLORS.muted}
            />
            <Text
              style={{
                color: activeTab === tab.id ? COLORS.white : COLORS.muted,
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Liked Songs */}
      {activeTab === "liked" && (
        <>
          {isLoading ? (
            <View style={{ padding: 4 }}>
              {[...Array(5)].map((_, i) => (
                <TrackRowSkeleton key={i} />
              ))}
            </View>
          ) : likedTracks.length > 0 ? (
            <FlatList
              data={likedTracks}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 100 }}
              renderItem={({ item, index }) => (
                <TrackRow
                  track={item}
                  onPress={() => playTrackList(likedTracks, index)}
                />
              )}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="heart-outline" size={48} color={COLORS.muted} />
              <Text
                style={{
                  color: COLORS.muted,
                  fontSize: 16,
                  marginTop: 12,
                }}
              >
                No liked songs yet
              </Text>
            </View>
          )}
        </>
      )}

      {/* Playlists */}
      {activeTab === "playlists" && (
        <FlatList
          data={userPlaylists}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <TouchableOpacity
              onPress={() => router.push("/(stack)/create-playlist")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 12,
                gap: 12,
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 8,
                  backgroundColor: COLORS.card,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  borderStyle: "dashed",
                }}
              >
                <Ionicons name="add" size={28} color={COLORS.accent} />
              </View>
              <Text
                style={{
                  color: COLORS.text,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Create Playlist
              </Text>
            </TouchableOpacity>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/(stack)/playlist/${item.id}`)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 10,
                gap: 12,
              }}
            >
              <Image
                source={{ uri: item.cover_url || PLACEHOLDER_ARTWORK }}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 8,
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
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: COLORS.muted,
                    fontSize: 13,
                    marginTop: 2,
                  }}
                >
                  {item.is_curated ? "Curated" : "Playlist"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Artists (placeholder) */}
      {activeTab === "artists" && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="people-outline" size={48} color={COLORS.muted} />
          <Text
            style={{ color: COLORS.muted, fontSize: 16, marginTop: 12 }}
          >
            Follow artists to see them here
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
