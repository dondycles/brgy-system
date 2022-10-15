/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bgColor': '#000B44',
        'accentColor': '#007BFF'
      },
      boxShadow: {
        'customShadow': '0px 0px 30px rgba(0,0,0,0.5)'
      }
    },
  },
  plugins: [],
}