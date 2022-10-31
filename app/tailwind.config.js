/** @type {import('tailwindcss').Config} */
// defaultTheme @'tailwindcss/defaultTheme'
module.exports = {
  content: [
    "./src/app/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./docs/**/*.html",
    "./index.html"
  ],
  theme: {
    extend: {
      // colors: {
      //   primary: "#4682b3"
      // },
      screens: {
        // 'sm': '640px',
        // 'md': '768px',
        // lg: "968px",
        // 'xl': '1280px',
        // '2xl': '1536px',
        tall: { raw: "(min-height: 792px)" },
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};