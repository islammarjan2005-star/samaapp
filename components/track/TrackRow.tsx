import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { COLORS, PLACEHOLDER_ARTWORK } from "@/lib/constants";
import { formatDuration } from "@/lib/helpers";
import { Track, usePlayerStore } from "@/stores/playerStore";
import { useLibraryStore } from "@/stores/libraryStore";
import { useAuthStore } from "@/stores/authStore";

interface TrackRowProps {
  track: Track;
  index?: number;
  showArtwork?: boolean;
  onPress?: () => void;
}

export const TrackRow = React.memo(function TrackRow({
  track,
  index,
  showArtwork = true,
  onPress,
}: TrackRowProps) {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isLiked = useLibraryStore((s) => s.isLiked(track.id));
  const toggleLike = useLibraryStore((s) => s.toggleLike);
  const user = useAuthStore((s) => s.user);
  const isActive = currentTrack?.id === track.id;

  const handleLike = () => {
    if (!user) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleLike(user.id, track.id);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 16,
        gap: 12,
      }}
    >
      {index !== undefined && (
        <Text
          style={{
            color: isActive ? COLORS.accent : COLORS.muted,
            fontSize: 14,
            width: 24,
            textAlign: "center",
            fontWeight: isActive ? "700" : "400",
          }}
        >
          {index + 1}
        </Text>
      )}

      {showArtwork && (
        <Image
          source={{ uri: track.artwork_url || PLACEHOLDER_ARTWORK }}
          style={{ width: 48, height: 48, borderRadius: 6 }}
          contentFit="cover"
          transition={200}
        />
      )}

      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{
            color: isActive ? COLORS.accent : COLORS.text,
            fontSize: 15,
            fontWeight: isActive ? "600" : "400",
          }}
        >
          {track.title}
        </Text>
        <Text
          numberOfLines={1}
          style={{ color: COLORS.muted, fontSize: 13, marginTop: 2 }}
        >
          {track.artist_name || "Unknown Artist"}
        </Text>
      </View>

      <Text style={{ color: COLORS.muted, fontSize: 12, marginRight: 8 }}>
        {formatDuration(track.duration)}
      </Text>

      <TouchableOpacity onPress={handleLike} hitSlop={8}>
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={20}
          color={isLiked ? COLORS.accent : COLORS.muted}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
});
