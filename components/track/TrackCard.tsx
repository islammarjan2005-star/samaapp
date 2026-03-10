import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { COLORS, PLACEHOLDER_ARTWORK } from "@/lib/constants";
import { Track } from "@/stores/playerStore";

interface TrackCardProps {
  track: Track;
  onPress?: () => void;
  size?: "sm" | "md" | "lg";
}

export const TrackCard = React.memo(function TrackCard({
  track,
  onPress,
  size = "md",
}: TrackCardProps) {
  const dimensions = { sm: 120, md: 150, lg: 180 };
  const dim = dimensions[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{ width: dim }}
    >
      <Image
        source={{ uri: track.artwork_url || PLACEHOLDER_ARTWORK }}
        style={{
          width: dim,
          height: dim,
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
          fontSize: size === "sm" ? 13 : 14,
          fontWeight: "500",
          marginTop: 8,
        }}
      >
        {track.title}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          color: COLORS.muted,
          fontSize: size === "sm" ? 11 : 12,
          marginTop: 2,
        }}
      >
        {track.artist_name || "Unknown Artist"}
      </Text>
    </TouchableOpacity>
  );
});
