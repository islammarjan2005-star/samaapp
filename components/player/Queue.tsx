import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePlayerStore } from "@/stores/playerStore";
import { usePlayer } from "@/hooks/usePlayer";
import { TrackRow } from "@/components/track/TrackRow";
import { COLORS } from "@/lib/constants";

export function Queue() {
  const queue = usePlayerStore((s) => s.queue);
  const queueIndex = usePlayerStore((s) => s.queueIndex);
  const removeFromQueue = usePlayerStore((s) => s.removeFromQueue);
  const { playTrackList } = usePlayer();

  const upcomingTracks = queue.slice(queueIndex + 1);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
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
        Queue
      </Text>

      {queue.length > 0 && (
        <>
          <Text
            style={{
              color: COLORS.muted,
              fontSize: 13,
              fontWeight: "600",
              paddingHorizontal: 16,
              paddingVertical: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Now Playing
          </Text>
          {queue[queueIndex] && (
            <TrackRow
              track={queue[queueIndex]}
              onPress={() => playTrackList(queue, queueIndex)}
            />
          )}
        </>
      )}

      {upcomingTracks.length > 0 && (
        <>
          <Text
            style={{
              color: COLORS.muted,
              fontSize: 13,
              fontWeight: "600",
              paddingHorizontal: 16,
              paddingVertical: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginTop: 8,
            }}
          >
            Up Next
          </Text>
          <FlatList
            data={upcomingTracks}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 1 }}>
                  <TrackRow
                    track={item}
                    onPress={() => playTrackList(queue, queueIndex + 1 + index)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => removeFromQueue(queueIndex + 1 + index)}
                  style={{ paddingRight: 16 }}
                  hitSlop={8}
                >
                  <Ionicons name="close" size={18} color={COLORS.muted} />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}

      {queue.length === 0 && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="musical-notes-outline" size={48} color={COLORS.muted} />
          <Text
            style={{
              color: COLORS.muted,
              fontSize: 16,
              marginTop: 12,
            }}
          >
            Queue is empty
          </Text>
        </View>
      )}
    </View>
  );
}
