const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var nodeExternals = require('webpack-node-externals');

const SaveAssetsJson = require('assets-webpack-plugin');

config.bail = true;
config.profile = false;
config.devtool = '#source-map';

config.target = 'node';
config.mode = 'development'

config.externals = [nodeExternals()];

config.output = {
  path: path.resolve(path.join(__dirname, 'server-dist')),
  publicPath: process.env.ASSET_CDN ? process.env.ASSET_CDN : '/dist/',
  filename: 'server.js',
};

config.node = {
  __dirname: false,
  __filename: false,
};

config.entry = {
  main: ['./src/server-setup.js'],
},


config.plugins = config.plugins.concat([
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
    new SaveAssetsJson({
    path: process.cwd(),
    filename: 'server-assets.json',
  }),
]);

module.exports = config;
