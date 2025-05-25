/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46E5",
        income: "#16a34a",
        expense: "#dc2626",
      }
    },
  },
  plugins: [],
  darkMode: "class",
};
