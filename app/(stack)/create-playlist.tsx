import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/lib/constants";
import { useLibraryStore } from "@/stores/libraryStore";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";

export default function CreatePlaylistScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const createPlaylist = useLibraryStore((s) => s.createPlaylist);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a playlist name");
      return;
    }
    if (!user) return;

    setLoading(true);
    const playlistId = await createPlaylist(
      user.id,
      title.trim(),
      description.trim() || undefined,
    );
    setLoading(false);

    if (playlistId) {
      router.back();
    } else {
      Alert.alert("Error", "Failed to create playlist");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.border,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: COLORS.muted, fontSize: 16 }}>Cancel</Text>
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.text,
            fontSize: 17,
            fontWeight: "700",
          }}
        >
          New Playlist
        </Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={{ padding: 24 }}>
        {/* Playlist icon */}
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 16,
              backgroundColor: COLORS.card,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
          >
            <Ionicons
              name="musical-notes"
              size={48}
              color={COLORS.accent}
            />
          </View>
        </View>

        {/* Title */}
        <Text
          style={{
            color: COLORS.muted,
            fontSize: 13,
            fontWeight: "600",
            marginBottom: 8,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Playlist Name
        </Text>
        <TextInput
          placeholder="Give your playlist a name"
          placeholderTextColor={COLORS.muted}
          value={title}
          onChangeText={setTitle}
          style={{
            color: COLORS.text,
            fontSize: 18,
            backgroundColor: COLORS.card,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderWidth: 1,
            borderColor: COLORS.border,
            marginBottom: 20,
          }}
          autoFocus
        />

        {/* Description */}
        <Text
          style={{
            color: COLORS.muted,
            fontSize: 13,
            fontWeight: "600",
            marginBottom: 8,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Description (optional)
        </Text>
        <TextInput
          placeholder="Add a description"
          placeholderTextColor={COLORS.muted}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          style={{
            color: COLORS.text,
            fontSize: 16,
            backgroundColor: COLORS.card,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderWidth: 1,
            borderColor: COLORS.border,
            marginBottom: 32,
            minHeight: 80,
            textAlignVertical: "top",
          }}
        />

        <Button
          title="Create Playlist"
          onPress={handleCreate}
          loading={loading}
          size="lg"
          disabled={!title.trim()}
        />
      </View>
    </SafeAreaView>
  );
}
