/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d5df40',
        secondary: '#2c4059',
        accent: '#be2625',
        light: '#e5e5e5',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        ttchocolates: ['TT Chocolates', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
