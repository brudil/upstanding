const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

const SaveAssetsJson = require('assets-webpack-plugin');

config.bail = true;
config.profile = false;
config.devtool = '#source-map';

config.target = 'node';

config.externals = [nodeExternals()];

config.output = {
  path: path.resolve(path.join(__dirname, 'server-dist')),
  publicPath: process.env.ASSET_CDN ? process.env.ASSET_CDN : '/dist/',
  filename: 'server.js',
};

config.entry = {
  // theprate: [
  //   'babel-polyfill',
  //   './src/verticals/theprate/application.js',
  // ],
  main: ['babel-polyfill', './src/server-setup.js'],
},


config.plugins = config.plugins.concat([
  new ExtractTextPlugin('[name].[contenthash].css'),
  new webpack.DefinePlugin({
    'process.env.LOWDOWN_HOST': `'${process.env.LOWDOWN_HOST}'`,
  }),
  new SaveAssetsJson({
    path: process.cwd(),
    filename: 'server-assets.json',
  }),
]);

config.module.rules = config.module.rules.concat([
//  {test: /\.js?$/, loaders: [ 'babel'], exclude: /node_modules/}
]);

module.exports = config;
