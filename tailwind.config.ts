import type { Config } from "tailwindcss";

/**
 * Neubrutalism design tokens — from designmd.app/library/neubrutalism
 * (thick black borders, hard offset shadows, flat candy colors, bold type).
 * Tailwind v3.4 + default dark mode ("media"); the design is light-first.
 */
const config: Config = {
  darkMode: "media",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        nb: {
          yellow: "#FFEB3B", // primary
          red: "#FF5252", // secondary / danger
          blue: "#2196F3", // tertiary / info
          green: "#22C55E", // functional success
          ink: "#111111", // off-black (spec: no pure black)
          paper: "#FBF7EA", // warm cream surface
          muted: "#F1ECDD", // subtle neutral panel
        },
      },
      boxShadow: {
        "nb-xs": "2px 2px 0 0 #111111",
        "nb-sm": "3px 3px 0 0 #111111",
        nb: "4px 4px 0 0 #111111",
        "nb-lg": "6px 6px 0 0 #111111",
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "Cairo", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
