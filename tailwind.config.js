module.exports = {
  purge: ["./src/**/*.css", "./src/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-black': '#000',
      },
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
