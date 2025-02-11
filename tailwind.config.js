/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E51a17",
        secondary: "#FFFFFF",
        price: "#FF5252",
        link: "#FF5252",
        textPrimary: "#000000",
        textSecondary: "#666666",
      },
    },
  },
  plugins: [],
}