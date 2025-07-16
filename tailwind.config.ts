import { type Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
  darkMode: "class",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        textBrand: "rgb(var(--color-text-brand) / <alpha-value>)",
        backgroundBrand: "rgb(var(--color-background-brand) / <alpha-value>)",
        primaryBrand: "rgb(var(--color-primary-brand) / <alpha-value>)",
        secondaryBrand: "rgb(var(--color-secondary-brand) / <alpha-value>)",
        accentBrand: "rgb(var(--color-accent-brand) / <alpha-value>)",
      },
    },
  },
  plugins: [],
} satisfies Config
