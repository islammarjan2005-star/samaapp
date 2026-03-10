import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { View, ViewStyle } from "react-native";

interface GeometricPatternProps {
  width?: number;
  height?: number;
  opacity?: number;
  style?: ViewStyle;
}

export function GeometricPattern({
  width = 300,
  height = 300,
  opacity = 0.05,
  style,
}: GeometricPatternProps) {
  return (
    <View style={[{ position: "absolute", opacity }, style]}>
      <Svg width={width} height={height} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="patternGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#10b981" stopOpacity="0.6" />
            <Stop offset="1" stopColor="#10b981" stopOpacity="0.1" />
          </LinearGradient>
        </Defs>
        {/* Islamic star pattern - 8-pointed star */}
        <Path
          d="M100 10 L120 80 L190 80 L135 120 L155 190 L100 150 L45 190 L65 120 L10 80 L80 80 Z"
          fill="none"
          stroke="url(#patternGrad)"
          strokeWidth="0.5"
        />
        <Path
          d="M100 30 L115 75 L160 75 L125 105 L140 150 L100 125 L60 150 L75 105 L40 75 L85 75 Z"
          fill="none"
          stroke="url(#patternGrad)"
          strokeWidth="0.5"
        />
        {/* Outer octagonal frame */}
        <Path
          d="M70 5 L130 5 L195 70 L195 130 L130 195 L70 195 L5 130 L5 70 Z"
          fill="none"
          stroke="url(#patternGrad)"
          strokeWidth="0.3"
        />
        {/* Inner geometric lines */}
        <Path d="M100 5 L100 195 M5 100 L195 100" fill="none" stroke="url(#patternGrad)" strokeWidth="0.2" />
        <Path d="M30 30 L170 170 M170 30 L30 170" fill="none" stroke="url(#patternGrad)" strokeWidth="0.2" />
      </Svg>
    </View>
  );
}
