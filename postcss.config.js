module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-ant')(),
    require('postcss-nested'),
    require('postcss-cssnext'),
    require('postcss-brand-colors'),
    require('postcss-lh'),
  ],
};
