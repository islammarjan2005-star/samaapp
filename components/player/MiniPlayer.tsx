import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { usePlayerStore } from "@/stores/playerStore";
import { usePlayer } from "@/hooks/usePlayer";
import { COLORS, PLACEHOLDER_ARTWORK } from "@/lib/constants";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const MiniPlayer = React.memo(function MiniPlayer() {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const position = usePlayerStore((s) => s.position);
  const duration = usePlayerStore((s) => s.duration);
  const { togglePlayPause, skipToNext } = usePlayer();
  const router = useRouter();

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

  const handlePress = () => {
    router.push("/(stack)/now-playing");
  };

  const handlePlayPause = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    togglePlayPause();
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    skipToNext();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.95}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surface,
        borderTopWidth: 0.5,
        borderTopColor: COLORS.border,
      }}
    >
      {/* Progress bar */}
      <View style={{ height: 2, backgroundColor: COLORS.border }}>
        <View
          style={{
            height: 2,
            width: `${progressPercent}%`,
            backgroundColor: COLORS.accent,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12,
          paddingVertical: 8,
          gap: 12,
        }}
      >
        <Image
          source={{ uri: currentTrack.artwork_url || PLACEHOLDER_ARTWORK }}
          style={{ width: 44, height: 44, borderRadius: 8 }}
          contentFit="cover"
          transition={200}
        />

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{ color: COLORS.text, fontSize: 14, fontWeight: "600" }}
          >
            {currentTrack.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: COLORS.muted, fontSize: 12, marginTop: 1 }}
          >
            {currentTrack.artist_name || "Unknown Artist"}
          </Text>
        </View>

        <TouchableOpacity onPress={handlePlayPause} hitSlop={12}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={28}
            color={COLORS.text}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} hitSlop={12}>
          <Ionicons name="play-forward" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});
