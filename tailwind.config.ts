import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf6f0",
          100: "#f9e6d8",
          200: "#f0c4a8",
          300: "#e39d73",
          400: "#d47a48",
          500: "#c25f2e",
          600: "#a84a23",
          700: "#8a3a1e",
          800: "#6f301d",
          900: "#5c2a1c",
        },
        ink: "#2b211b",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
