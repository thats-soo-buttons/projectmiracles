import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: "#000000",
        "terminal-green": "#00FF00",
        "terminal-dark-green": "#00AA00",
        bg: "#0f0f0f",
        surface: "#1a1a1a",
        "surface-2": "#242424",
        border: "#2e2e2e",
        accent: "#22c55e",
        "accent-dim": "#166534",
        text: "#e5e5e5",
        muted: "#9ca3af",
        cta: "#dc2626",
        "cta-hover": "#b91c1c",
      },
      fontFamily: {
        mono: ["'Courier New'", "Consolas", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
