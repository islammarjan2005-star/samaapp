import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/authStore";
import { useLibraryStore } from "@/stores/libraryStore";
import { MiniPlayer } from "@/components/player/MiniPlayer";
import { usePlayerStore } from "@/stores/playerStore";

export default function RootLayout() {
  const setSession = useAuthStore((s) => s.setSession);
  const setIsLoading = useAuthStore((s) => s.setIsLoading);
  const fetchProfile = useAuthStore((s) => s.fetchProfile);
  const user = useAuthStore((s) => s.user);
  const isPlayerVisible = usePlayerStore((s) => s.isPlayerVisible);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
      useLibraryStore.getState().fetchLikes(user.id);
      useLibraryStore.getState().fetchFollows(user.id);
    }
  }, [user]);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0a0a0a" },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
          <Stack.Screen
            name="(stack)/now-playing"
            options={{
              animation: "slide_from_bottom",
              presentation: "fullScreenModal",
            }}
          />
          <Stack.Screen name="(stack)/artist/[id]" />
          <Stack.Screen name="(stack)/album/[id]" />
          <Stack.Screen name="(stack)/playlist/[id]" />
          <Stack.Screen name="(stack)/create-playlist" />
        </Stack>
        {isPlayerVisible && <MiniPlayer />}
      </View>
    </GestureHandlerRootView>
  );
}
