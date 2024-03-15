/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'base': '#f1f5f9',
        'neutral': '#ffffff',
        'primary': '#0F5057',
        'secondary': '#E5FAf9',
      },
    },
  },
  plugins: [],
}