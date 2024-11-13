/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'galaxy-black-purple': "url('/galaxy-black-purple.jpg')",
      },
    },
  },
  plugins: [],
}
