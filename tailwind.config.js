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
        appSlate: '#0A0A0A',
        appSlate900: '#141414',
        appSlate800: '#1F1F1F',
        appSlate700: '#292929',
        appSlate600: '#333333',
        appRed: '#B8543D',
        appGreen: '#65A56D',
        appBlue: '#81ADC8',
        appWhite: '#F8F2DC'
      },
      aspectRatio: {
        'card': '3 / 4'
      }
    },
  },
  plugins: [],
}