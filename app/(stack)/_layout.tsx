import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#0a0a0a" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="now-playing"
        options={{
          animation: "slide_from_bottom",
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen name="artist/[id]" />
      <Stack.Screen name="album/[id]" />
      <Stack.Screen name="playlist/[id]" />
      <Stack.Screen name="create-playlist" />
    </Stack>
  );
}
