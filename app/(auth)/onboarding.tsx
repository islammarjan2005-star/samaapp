import { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { CATEGORIES, COLORS } from "@/lib/constants";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";
import { GeometricPattern } from "@/components/ui/GeometricPattern";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const STEPS = [
  {
    title: "What do you love?",
    subtitle: "Select your favorite categories to personalize your feed",
  },
  {
    title: "Your vibe",
    subtitle: "We'll use this to recommend content you'll enjoy",
  },
  {
    title: "You're all set!",
    subtitle: "Start exploring curated Islamic content",
  },
];

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  nasheeds: "musical-notes",
  quran: "book",
  anasheed: "mic",
  devotional: "heart",
  ambient: "moon",
};

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const updatePreferences = useAuthStore((s) => s.updatePreferences);
  const router = useRouter();

  const toggleCategory = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleNext = async () => {
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    setLoading(true);
    await updatePreferences(selectedCategories);
    setLoading(false);
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <GeometricPattern
        width={SCREEN_WIDTH}
        height={SCREEN_WIDTH}
        opacity={0.04}
        style={{ top: -100, right: -50 }}
      />

      {/* Progress dots */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
          paddingTop: 16,
        }}
      >
        {STEPS.map((_, i) => (
          <View
            key={i}
            style={{
              width: i === step ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === step ? COLORS.accent : COLORS.border,
            }}
          />
        ))}
      </View>

      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 32 }}>
        <Text
          style={{
            color: COLORS.text,
            fontSize: 28,
            fontWeight: "800",
            textAlign: "center",
          }}
        >
          {STEPS[step].title}
        </Text>
        <Text
          style={{
            color: COLORS.muted,
            fontSize: 16,
            textAlign: "center",
            marginTop: 8,
            lineHeight: 22,
          }}
        >
          {STEPS[step].subtitle}
        </Text>

        {step < 2 && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
              marginTop: 40,
            }}
          >
            {CATEGORIES.map((cat) => {
              const selected = selectedCategories.includes(cat.id);
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => toggleCategory(cat.id)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: selected ? COLORS.accent : COLORS.border,
                    backgroundColor: selected
                      ? COLORS.accent + "15"
                      : COLORS.card,
                  }}
                >
                  <Ionicons
                    name={iconMap[cat.id] || "musical-note"}
                    size={20}
                    color={selected ? COLORS.accent : COLORS.muted}
                  />
                  <Text
                    style={{
                      color: selected ? COLORS.accent : COLORS.text,
                      fontSize: 15,
                      fontWeight: "600",
                    }}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {step === 2 && (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: COLORS.accent + "20",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="checkmark-circle" size={48} color={COLORS.accent} />
            </View>
            {selectedCategories.length > 0 && (
              <Text
                style={{
                  color: COLORS.muted,
                  fontSize: 14,
                  marginTop: 16,
                  textAlign: "center",
                }}
              >
                Selected: {selectedCategories.join(", ")}
              </Text>
            )}
          </View>
        )}
      </View>

      <View style={{ paddingHorizontal: 32, paddingBottom: 32 }}>
        <Button
          title={step === 2 ? "Start Listening" : "Continue"}
          onPress={handleNext}
          loading={loading}
          size="lg"
          disabled={step < 2 && selectedCategories.length === 0}
        />
        {step === 0 && (
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)")}
            style={{ marginTop: 16, alignItems: "center" }}
          >
            <Text style={{ color: COLORS.muted, fontSize: 14 }}>
              Skip for now
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
