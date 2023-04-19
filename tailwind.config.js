/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      sans: ["Lexend", "serif"]
    },
    extend: {
      fontFamily: {
        spectral: ["Spectral SC", "sans-serif"],
        lexend: ["Lexend", "serif"]
      }
    },
  },
  plugins: [],
}

