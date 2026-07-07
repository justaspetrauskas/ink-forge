import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f5f5f5",
          100: "#e7e7e7",
          200: "#cfcfcf",
          300: "#b0b0b0",
          400: "#8d8d8d",
          500: "#6b6b6b",
          600: "#4f4f4f",
          700: "#333333",
          800: "#1f1f1f",
          900: "#111111"
        }
      }
    }
  },
  plugins: []
};

export default config;
