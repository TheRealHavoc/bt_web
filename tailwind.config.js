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
      },
      colors: {
        appSlate: '#141417',
        appSlate900: '#19191C',
        appSlate800: '#222225',
        appSlate700: '#2B2B2E',
        appSlate600: '#7A7A7C'
      }
    },
  },
  plugins: [],
}