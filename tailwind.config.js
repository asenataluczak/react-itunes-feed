/** @type {import('tailwindcss').Config} */
module.exports = {
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
      blue: '#539bf5',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
