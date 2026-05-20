import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./contexts/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080A0F",
        panel: "rgba(18, 22, 32, 0.72)",
        line: "rgba(255,255,255,0.12)",
        mint: "#5AF2C6",
        iris: "#8C7DFF",
        ember: "#FFB86B"
      },
      boxShadow: {
        glow: "0 0 50px rgba(90, 242, 198, 0.18)",
        panel: "0 24px 90px rgba(0,0,0,0.38)"
      }
    }
  },
  plugins: []
} satisfies Config;
