const colors = require("tailwindcss/colors");

module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    container: {
      padding: '2rem',
    },
    colors: {
      blue: colors.blue,
      gray: colors.blueGray,
      white: colors.white,
      rose: colors.rose
    },
    extend: {
      screens:{
        'mx': {'max': '767px'},
      },
      fontFamily: {
        custom: ['Righteous', 'sans-serif']
      }
    },
    zIndex: {
      '0': 0,
     '10': 10,
     '20': 20,
     '30': 30,
     '40': 40,
     '50': 50,
     '60': 60,
     '70': 70,
     '80':80,
     '90':90,
     '100': 100,
     'auto': 'auto',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
