import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from "react-native";
import * as Haptics from "expo-haptics";
import { COLORS } from "@/lib/constants";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const baseStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    gap: 8,
  };

  const sizeStyles: Record<string, ViewStyle> = {
    sm: { paddingHorizontal: 16, paddingVertical: 8 },
    md: { paddingHorizontal: 24, paddingVertical: 12 },
    lg: { paddingHorizontal: 32, paddingVertical: 16 },
  };

  const variantStyles: Record<string, ViewStyle> = {
    primary: { backgroundColor: COLORS.accent },
    secondary: { backgroundColor: COLORS.card },
    outline: { borderWidth: 1, borderColor: COLORS.border, backgroundColor: "transparent" },
    ghost: { backgroundColor: "transparent" },
  };

  const textColors: Record<string, string> = {
    primary: COLORS.white,
    secondary: COLORS.text,
    outline: COLORS.text,
    ghost: COLORS.accent,
  };

  const textSizes: Record<string, number> = {
    sm: 13,
    md: 15,
    lg: 17,
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        baseStyle,
        sizeStyles[size],
        variantStyles[variant],
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColors[variant]} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              {
                color: textColors[variant],
                fontSize: textSizes[size],
                fontWeight: "600",
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
