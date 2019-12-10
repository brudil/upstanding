process.env.BABEL_ENV = 'server';

const WebpackTools = require('webpack-isomorphic-tools');
const webpackServerConfig = require('../webpack-isomorphic-tools-configuration');

process.env.SERVER = true;

// this must be equal to your Webpack configuration "context" parameter
const projectBasePath = require('path').resolve(__dirname, '..');

// this global variable will be used later in express middleware
global.webpack_isomorphic_tools = new WebpackTools(webpackServerConfig)
  // enter development mode if needed
  // (you may also prefer to use a Webpack DefinePlugin variable)
  // initializes a server-side instance of webpack-isomorphic-tools
  // (the first parameter is the base path for your project
  //  and is equal to the "context" parameter of you Webpack configuration)
  // (if you prefer Promises over callbacks
  //  you can omit the callback parameter
  //  and then it will return a Promise instead)
  .server(projectBasePath, () => {
    // eslint-disable-next-line global-require
    require('./server-setup');
  });
