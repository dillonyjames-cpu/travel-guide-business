/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cedar forest, washi paper, temple bronze, autumn gold.
        "forest-deep": "#16231d",
        forest: "#24382e",
        ivory: "#f7f3ea",
        paper: "#efe9dc",
        bronze: "#9a6a3a",
        gold: "#d4b06a",
        charcoal: "#1f1d1a",
        smoke: "#5b574f",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", '"Times New Roman"', "serif"],
        sans: ['"Manrope"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
