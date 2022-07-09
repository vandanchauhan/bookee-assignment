/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': '#55CB82',
        'pink': '#FE93B3',
        'darkGreen': '#16A64D',
        'darkPink': '#E2006A',
        'textBlue': '#4F6C92',
        'borderGrey': '#CBD2E1',
        'bgWhite': '#F7F8FB',
        'bgGray': '#F1F4F8',
        'darkGray': '#A4B8D3',
      },
    },
  },
  plugins: [],
}
