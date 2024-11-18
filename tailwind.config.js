/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "!./src/server/**/*",
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
