import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
export default {
  darkMode: "class", // <-- add this line
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        textBrand: "var(--color-text-brand)",
        backgroundBrand: "var(--color-background-brand)",
        primaryBrand: "var(--color-primary-brand)",
        secondaryBrand: "var(--color-secondary-brand)",
        accentBrand: "var(--color-accent-brand)",
      },
    },
  },
  plugins: [],
} satisfies Config;

