import { useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";
import { COLORS } from "@/lib/constants";

interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width, height, borderRadius = 8, style }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: width as number,
          height,
          borderRadius,
          backgroundColor: COLORS.card,
          opacity,
        },
        style,
      ]}
    />
  );
}

export function TrackRowSkeleton() {
  return (
    <Animated.View style={{ flexDirection: "row", alignItems: "center", padding: 12, gap: 12 }}>
      <Skeleton width={48} height={48} borderRadius={6} />
      <Animated.View style={{ flex: 1, gap: 6 }}>
        <Skeleton width={160} height={14} />
        <Skeleton width={100} height={12} />
      </Animated.View>
    </Animated.View>
  );
}

export function CardSkeleton() {
  return (
    <Animated.View style={{ width: 150, gap: 8 }}>
      <Skeleton width={150} height={150} borderRadius={12} />
      <Skeleton width={120} height={14} />
      <Skeleton width={80} height={12} />
    </Animated.View>
  );
}
