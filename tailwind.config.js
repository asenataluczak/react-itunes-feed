/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
    colors: {
      gray: {
        50: '#bfd5d5',
        100: '#888888',
        200: '#444c56',
        300: '#2d333b',
        400: '#22272e',
      },
      blue: '#539bf5',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
