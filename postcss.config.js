module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-nested'),
    require('postcss-ant')(),
    require('postcss-cssnext'),
    require('postcss-brand-colors'),
    require('postcss-lh'),
  ],
};
