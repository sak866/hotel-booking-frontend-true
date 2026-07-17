/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1B2430",
        "ink-deep": "#12181F",
        paper: "#F6F3EC",
        "paper-dim": "#EFEADC",
        brass: "#B8863F",
        "brass-dark": "#A5762F",
        teal: "#4C7A73",
        rose: "#C1666B",
      },
      fontFamily: {
        serif: ["'Fraunces'", "Georgia", "serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
