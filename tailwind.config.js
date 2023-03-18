/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      fontFamily: {
        notosans: ["Noto Sans KR", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        nanumBrush: ["Nanum Brush Script", "cursive"],
      },
      colors: {
        BLACK: "#16171a",
        GRAY001: "#E9EDF5",
        GRAY003: "#f0f3fa",
        GRAY002: "#fafcff",
        GRAY004: "#777e8c",
        GRAY005: "#575c66",
        BLUE: "#188bff",
        LINKTEXT: "#0050b3",
        RED: "#d32620",
        GREEN: "#B0D1D4",
        BACKGROUND: "#EEEEEE",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
