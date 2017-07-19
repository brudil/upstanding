var isProduction = process.env.NODE_ENV === 'production';
var config = isProduction ? require('./webpack.prod.config') : require('./webpack.dev.config');

module.exports = config;
