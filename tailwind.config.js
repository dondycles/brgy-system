/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "#000B44",
        accentColor: "#007BFF",
      },
      boxShadow: {
        customShadow: "0px 0px 30px rgba(0,0,0,0.5)",
      },
      keyframes: {
        dialougeAnim: {
          "0%": {
            transform: "translateY(5%) translateX(-50%) translateZ(0)",
          },
          "50%": {
            transform: "translateY(0%) translateX(-50%) translateZ(0)",
          },
          "100%": {
            transform: "translateY(0%) translateX(-50%) translateZ(0)",
          },
        },
      },
      animation: {
        dialougeAnim: "dialougeAnim 2s infinite alternate",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
