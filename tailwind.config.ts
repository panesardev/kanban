/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral': '#ffffff',
        'primary': '#155e75',
        'secondary': '#E5FAf9',
      },
    },
  },
  plugins: [],
}