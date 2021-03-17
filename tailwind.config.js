const colors = require("tailwindcss/colors");

module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      padding: '2rem',
    },
    colors: {
      blue: colors.blue,
      gray: colors.blueGray,
      white: colors.white,
    },
    extend: {
      screens:{
        'mx': {'max': '767px'},
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
