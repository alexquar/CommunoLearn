import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        textBrand : "#7784a1",
        backgroundBrand : "#f6f6f6",
        primaryBrand : "#ebd65a",
        secondaryBrand : "#ee6605",
        accentBrand : "#777b83"
      }
    },
  },
  plugins: [],
} satisfies Config;
