const webpack = require('webpack');

const path = require('path');
const _ = require('lodash');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const webpackServerConfig = require('./webpack-isomorphic-tools-configuration');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined',
};

_.assign(env, {
  build: env.production || env.staging,
});

const webpackIsomorphicToolsInstance = new WebpackIsomorphicToolsPlugin(
  webpackServerConfig
).development();

const developmentPlugins = [];

// const developmentPlugins = NODE_ENV !== 'production' ? [new StyleLintPlugin({
//  files: './src/**/*.css',
//  configFile: './stylelint.config.js',
// })] : []; */

module.exports = {
  target: 'web',
  context: __dirname,

  entry: {
    // theprate: [
    //   'babel-polyfill',
    //   './src/verticals/theprate/application.js',
    // ],
    thedrab: ['babel-polyfill', './src/verticals/thedrab/application.js'],
  },

  output: {
    path: path.join(__dirname, '/build'),
    publicPath: 'http://localhost:8088/build/',
    filename: '[name].application.js',
  },

  resolve: {
    modules: ['web_modules', 'node_modules', './src/images'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${NODE_ENV}'`,
      DEVELOPMENT: env.development,
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: `'${NODE_ENV}'`,
    }),
    ...developmentPlugins,
    webpackIsomorphicToolsInstance,
  ],

  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?importLoaders=1!postcss-loader',
        }),
      },
      {
        test: webpackIsomorphicToolsInstance.regular_expression('images'),
        loader: 'file-loader',
      },
    ],

    noParse: /\.min\.js/,
  },
};
