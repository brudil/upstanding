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
    'process.env.LOWDOWN_HOST': "'https://platform.theprate.com'",
  }),
  new webpack.NoEmitOnErrorsPlugin(),
]);

module.exports = config;
