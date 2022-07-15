const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-calc'),
    require('postcss-advanced-variables'),
    require('postcss-nested'),
    require('postcss-map-get'),
    ...(process.env.NODE_ENV === 'production' ? [
      purgecss({
        content: ['./src/**/*.{html,hbs,ts}'],
      }),
    ] : []),
  ],
};
