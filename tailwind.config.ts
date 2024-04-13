/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral': '#ffffff',
        'primary': '#156B75',
        'secondary': '#E5FAF9',
      },
    },
  },
  plugins: [],
}