/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#FFF",
      black: "#000",
      darkblue: "#4D7DC1",
      bgblue:"#EDF8FF",
      blue: "#8AB9E3",
      gray: "#000",
      gray2: "#000",
      pink:"#FF43BC",
      pinkbg:"#FF6ED2"
    },
    extend: {
      screens: {
        sm: { max: "639px" },
        md: { max: "866px" },
        lg: { min: "867px", max: "1100px" },
        xl: { min: "1100px", max: "1279px" },
        "2xl": { min: "1280px", max: "1335px" },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
