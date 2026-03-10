export const CATEGORIES = [
  { id: "nasheeds", label: "Nasheeds", icon: "music-note" },
  { id: "quran", label: "Quran Recitations", icon: "book-open-variant" },
  { id: "anasheed", label: "Anasheed", icon: "microphone-variant" },
  { id: "devotional", label: "Devotional", icon: "heart" },
  { id: "ambient", label: "Ambient", icon: "weather-night" },
] as const;

export type Category = (typeof CATEGORIES)[number]["id"];

export const COLORS = {
  bg: "#0a0a0a",
  surface: "#141414",
  card: "#1a1a1a",
  border: "#2a2a2a",
  muted: "#6b7280",
  text: "#f5f5f5",
  textSecondary: "#9ca3af",
  accent: "#10b981",
  accentLight: "#34d399",
  accentDark: "#059669",
  error: "#ef4444",
  white: "#ffffff",
} as const;

export const REPEAT_MODES = {
  OFF: "off",
  ALL: "all",
  ONE: "one",
} as const;

export type RepeatMode = (typeof REPEAT_MODES)[keyof typeof REPEAT_MODES];

export const PLACEHOLDER_ARTWORK =
  "https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains";

export const PLACEHOLDER_AUDIO =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
