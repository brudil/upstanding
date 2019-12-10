const webpack = require('webpack');
const config = require('./webpack.base.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

if (process.env.NODE_ENV === 'xtest') {
  config.entry = [
    // 'webpack-dev-server/client?http://localhost:8088',
    // 'webpack/hot/only-dev-server',
    config.entry[0],
    config.entry[1],
  ];
}

config.devtool = 'inline-source-map';

config.plugins = config.plugins.concat([
  new MiniCssExtractPlugin({
    filename: '[name].style.css'
  }),
  new webpack.DefinePlugin({
    'process.env.LOWDOWN_HOST': "'http://localhost:8000'",
  }),
  new webpack.NoEmitOnErrorsPlugin(),
]);

/* config.module.rules = config.module.rules.concat([
  {
    test: /\.js$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
    enforce: 'pre',
  },
]);
*/
module.exports = config;
