import { View, Text, TouchableOpacity, SafeAreaView, Alert, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, PLACEHOLDER_ARTWORK } from "@/lib/constants";
import { useAuthStore } from "@/stores/authStore";
import { usePlayerStore } from "@/stores/playerStore";
import { Button } from "@/components/ui/Button";
import { GeometricPattern } from "@/components/ui/GeometricPattern";

export default function ProfileScreen() {
  const { profile, user, signOut } = useAuthStore();
  const resetPlayer = usePlayerStore((s) => s.reset);
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          resetPlayer();
          await signOut();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="person-circle-outline" size={80} color={COLORS.muted} />
          <Text
            style={{
              color: COLORS.text,
              fontSize: 20,
              fontWeight: "700",
              marginTop: 16,
            }}
          >
            Profile
          </Text>
          <Text
            style={{
              color: COLORS.muted,
              fontSize: 15,
              marginTop: 8,
            }}
          >
            Sign in to access your profile
          </Text>
          <Button
            title="Sign In"
            onPress={() => router.push("/(auth)/login")}
            style={{ marginTop: 24, paddingHorizontal: 48 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const menuItems: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
  }[] = [
    {
      icon: "heart",
      label: "Liked Songs",
      onPress: () => router.push("/(tabs)/library"),
    },
    {
      icon: "download-outline",
      label: "Downloads",
      onPress: () => {},
    },
    {
      icon: "time-outline",
      label: "Listening History",
      onPress: () => {},
    },
    {
      icon: "settings-outline",
      label: "Settings",
      onPress: () => {},
    },
    {
      icon: "information-circle-outline",
      label: "About Sama",
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <GeometricPattern
          width={300}
          height={300}
          opacity={0.04}
          style={{ top: -80, right: -80 }}
        />

        {/* Header */}
        <View style={{ alignItems: "center", paddingTop: 32, paddingBottom: 24 }}>
          <Image
            source={{ uri: profile?.avatar_url || PLACEHOLDER_ARTWORK }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: COLORS.card,
            }}
            contentFit="cover"
          />
          <Text
            style={{
              color: COLORS.text,
              fontSize: 24,
              fontWeight: "700",
              marginTop: 16,
            }}
          >
            {profile?.display_name || "User"}
          </Text>
          <Text
            style={{
              color: COLORS.muted,
              fontSize: 14,
              marginTop: 4,
            }}
          >
            {profile?.email}
          </Text>

          {profile?.preferred_categories &&
            profile.preferred_categories.length > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  marginTop: 12,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {profile.preferred_categories.map((cat) => (
                  <View
                    key={cat}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 12,
                      backgroundColor: COLORS.accent + "20",
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.accent,
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      {cat}
                    </Text>
                  </View>
                ))}
              </View>
            )}
        </View>

        {/* Menu */}
        <View style={{ paddingHorizontal: 16 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 16,
                gap: 16,
                borderBottomWidth: 0.5,
                borderBottomColor: COLORS.border,
              }}
            >
              <Ionicons name={item.icon} size={22} color={COLORS.muted} />
              <Text
                style={{
                  flex: 1,
                  color: COLORS.text,
                  fontSize: 16,
                }}
              >
                {item.label}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.muted}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out */}
        <View style={{ paddingHorizontal: 16, marginTop: 32 }}>
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="outline"
            size="lg"
            icon={
              <Ionicons name="log-out-outline" size={20} color={COLORS.text} />
            }
          />
        </View>

        {/* Version */}
        <Text
          style={{
            color: COLORS.muted,
            fontSize: 12,
            textAlign: "center",
            marginTop: 24,
          }}
        >
          Sama v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
