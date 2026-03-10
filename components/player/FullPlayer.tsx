import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import { usePlayerStore } from "@/stores/playerStore";
import { usePlayer } from "@/hooks/usePlayer";
import { useLibraryStore } from "@/stores/libraryStore";
import { useAuthStore } from "@/stores/authStore";
import { COLORS, PLACEHOLDER_ARTWORK, REPEAT_MODES } from "@/lib/constants";
import { formatDuration } from "@/lib/helpers";
import { GeometricPattern } from "@/components/ui/GeometricPattern";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ARTWORK_SIZE = SCREEN_WIDTH - 80;

export function FullPlayer() {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const position = usePlayerStore((s) => s.position);
  const duration = usePlayerStore((s) => s.duration);
  const repeatMode = usePlayerStore((s) => s.repeatMode);
  const isShuffled = usePlayerStore((s) => s.isShuffled);
  const toggleShuffle = usePlayerStore((s) => s.toggleShuffle);
  const user = useAuthStore((s) => s.user);
  const isLiked = useLibraryStore((s) =>
    currentTrack ? s.isLiked(currentTrack.id) : false,
  );
  const toggleLike = useLibraryStore((s) => s.toggleLike);
  const {
    togglePlayPause,
    skipToNext,
    skipToPrevious,
    seekTo,
    setRepeatMode,
  } = usePlayer();
  const router = useRouter();

  const repeatIcon = useMemo(() => {
    switch (repeatMode) {
      case REPEAT_MODES.ONE:
        return "repeat" as const;
      case REPEAT_MODES.ALL:
        return "repeat" as const;
      default:
        return "repeat" as const;
    }
  }, [repeatMode]);

  if (!currentTrack) return null;

  const handleLike = () => {
    if (!user) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleLike(user.id, currentTrack.id);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <GeometricPattern
        width={SCREEN_WIDTH}
        height={SCREEN_WIDTH}
        opacity={0.03}
        style={{ top: 0, right: -50 }}
      />

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 16,
        }}
      >
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-down" size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.muted,
            fontSize: 12,
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Now Playing
        </Text>
        <TouchableOpacity hitSlop={12}>
          <Ionicons name="ellipsis-horizontal" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Artwork */}
      <View style={{ alignItems: "center", paddingVertical: 20 }}>
        <Image
          source={{ uri: currentTrack.artwork_url || PLACEHOLDER_ARTWORK }}
          style={{
            width: ARTWORK_SIZE,
            height: ARTWORK_SIZE,
            borderRadius: 16,
            backgroundColor: COLORS.card,
          }}
          contentFit="cover"
          transition={300}
        />
      </View>

      {/* Track Info + Like */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 32,
          marginTop: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{
              color: COLORS.text,
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            {currentTrack.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: COLORS.muted,
              fontSize: 16,
              marginTop: 4,
            }}
          >
            {currentTrack.artist_name || "Unknown Artist"}
          </Text>
        </View>
        <TouchableOpacity onPress={handleLike} hitSlop={12}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={26}
            color={isLiked ? COLORS.accent : COLORS.muted}
          />
        </TouchableOpacity>
      </View>

      {/* Slider */}
      <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={duration || 1}
          value={position}
          onSlidingComplete={(val) => seekTo(val)}
          minimumTrackTintColor={COLORS.accent}
          maximumTrackTintColor={COLORS.border}
          thumbTintColor={COLORS.accent}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 4,
            marginTop: -4,
          }}
        >
          <Text style={{ color: COLORS.muted, fontSize: 12 }}>
            {formatDuration(position)}
          </Text>
          <Text style={{ color: COLORS.muted, fontSize: 12 }}>
            {formatDuration(duration)}
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 32,
          marginTop: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            toggleShuffle();
          }}
          hitSlop={12}
        >
          <Ionicons
            name="shuffle"
            size={24}
            color={isShuffled ? COLORS.accent : COLORS.muted}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            skipToPrevious();
          }}
          hitSlop={12}
        >
          <Ionicons name="play-skip-back" size={32} color={COLORS.text} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            togglePlayPause();
          }}
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: COLORS.accent,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={32}
            color={COLORS.white}
            style={isPlaying ? {} : { marginLeft: 3 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            skipToNext();
          }}
          hitSlop={12}
        >
          <Ionicons name="play-skip-forward" size={32} color={COLORS.text} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setRepeatMode();
          }}
          hitSlop={12}
        >
          <Ionicons
            name={repeatIcon}
            size={24}
            color={
              repeatMode !== REPEAT_MODES.OFF ? COLORS.accent : COLORS.muted
            }
          />
          {repeatMode === REPEAT_MODES.ONE && (
            <Text
              style={{
                color: COLORS.accent,
                fontSize: 8,
                fontWeight: "700",
                position: "absolute",
                bottom: -6,
                alignSelf: "center",
              }}
            >
              1
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
