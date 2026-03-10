import { View } from "react-native";
import { COLORS } from "@/lib/constants";

interface SliderProps {
  style?: any;
  minimumValue?: number;
  maximumValue?: number;
  value?: number;
  onSlidingComplete?: (value: number) => void;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
}

export default function WebSlider({
  minimumValue = 0,
  maximumValue = 1,
  value = 0,
  onSlidingComplete,
  minimumTrackTintColor = COLORS.accent,
  maximumTrackTintColor = COLORS.border,
}: SliderProps) {
  const percent =
    maximumValue > 0
      ? ((value - minimumValue) / (maximumValue - minimumValue)) * 100
      : 0;

  return (
    <View style={{ width: "100%", paddingVertical: 16 }}>
      <input
        type="range"
        min={minimumValue}
        max={maximumValue}
        step={0.1}
        value={value}
        onChange={(e) => onSlidingComplete?.(parseFloat(e.target.value))}
        style={{
          width: "100%",
          height: 4,
          appearance: "none",
          WebkitAppearance: "none",
          background: `linear-gradient(to right, ${minimumTrackTintColor} ${percent}%, ${maximumTrackTintColor} ${percent}%)`,
          borderRadius: 2,
          outline: "none",
          cursor: "pointer",
        }}
      />
    </View>
  );
}
