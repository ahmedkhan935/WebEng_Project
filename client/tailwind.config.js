module.exports = {
  purge: ['./src/**/UserLandingPage.js'],
  // ...
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}