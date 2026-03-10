const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Ensure web platform resolution works for .web.ts/.web.tsx files
config.resolver.sourceExts = [...(config.resolver.sourceExts || []), "web.ts", "web.tsx"];

module.exports = withNativeWind(config, { input: "./global.css" });
