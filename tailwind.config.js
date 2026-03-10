/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        sama: {
          bg: "#0a0a0a",
          surface: "#141414",
          card: "#1a1a1a",
          border: "#2a2a2a",
          muted: "#6b7280",
          text: "#f5f5f5",
          accent: "#10b981",
          "accent-light": "#34d399",
          "accent-dark": "#059669",
        },
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
