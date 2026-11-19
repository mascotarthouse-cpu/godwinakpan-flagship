import type { Config } from "tailwindcss";

// Brand style guide tokens. One accent per layout. Never gold.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        eagle: "#000000",
        graphite: "#1C1C1C",
        obsidian: "#0A0A0C",
        sky: "#FFFFFF",
        paper: "#F8F9FA",
        ivory: "#F7F4EE",
        ash: "#6B6B6B",
        slate: { DEFAULT: "#8B9DB3" },
        red: { DEFAULT: "#D62828", deep: "#B11F1F" },
        flight: "#2196F3",
        growth: "#009933",
      },
      fontFamily: {
        display: ["var(--f-display)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["var(--f-body)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: { display: "-0.03em", tightest: "-0.045em" },
      fontSize: {
        hero: ["clamp(3rem, 7vw, 6.5rem)", { lineHeight: "0.95" }],
        mega: ["clamp(3.5rem, 11vw, 11rem)", { lineHeight: "0.88" }],
        h2: ["clamp(2.25rem, 4.6vw, 4.25rem)", { lineHeight: "1" }],
        h3: ["clamp(1.5rem, 2.4vw, 2.25rem)", { lineHeight: "1.1" }],
      },
      maxWidth: { site: "1440px" },
      transitionTimingFunction: { expo: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  },
  plugins: [],
};
export default config;
