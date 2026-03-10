import { Platform } from "react-native";

const Haptics =
  Platform.OS !== "web"
    ? require("expo-haptics")
    : null;

export const ImpactFeedbackStyle = {
  Light: Haptics?.ImpactFeedbackStyle?.Light ?? 0,
  Medium: Haptics?.ImpactFeedbackStyle?.Medium ?? 1,
  Heavy: Haptics?.ImpactFeedbackStyle?.Heavy ?? 2,
};

export function impactAsync(style: number = ImpactFeedbackStyle.Light): void {
  if (Haptics) {
    Haptics.impactAsync(style);
  }
}
