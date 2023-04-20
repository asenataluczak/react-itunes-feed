/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
    colors: {
      gray: {
        50: '#bfd5d5',
        100: '#adbac7',
        200: '#888888',
        300: '#444c56',
        400: '#373e47',
        500: '#2d333b',
        600: '#22272e',
      },
      sand: {
        50: '#fdf6e3',
        100: '#ebe2ce',
        200: '#cac4b5',
        300: '#969287',
        400: '#636059',
        500: '#302e2b',
      },
      blue: '#539bf5',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
