/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#FFF",
      black: "#000",
      "blue-2": "#ADD7F6",
      "blue-1": "#87BFFF",
      "blue-0": "#3F8EFC",
      "blue+1": "#2667FF",
      "blue+2": "#3B28CC",
      bluepurple: "#4633D7",
      navyblue: "#1F20AE",
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
