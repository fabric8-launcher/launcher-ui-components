var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const LAUNCHER_BACKEND_URL = process.env.LAUNCHER_BACKEND_URL || '/launch/api';
const LAUNCHER_KEYCLOAK_URL = process.env.LAUNCHER_KEYCLOAK_URL;
const LAUNCHER_KEYCLOAK_REALM = process.env.LAUNCHER_KEYCLOAK_REALM;
const LAUNCHER_KEYCLOAK_CLIENT_ID = process.env.LAUNCHER_KEYCLOAK_CLIENT_ID || 'openshiftio-public';
const LAUNCHER_FRONTEND_SENTRY_DSN = process.env.LAUNCHER_FRONTEND_SENTRY_DSN;
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/launch/';

const METADATA = webpackMerge(commonConfig.metadata, {
  ENV: ENV,
  PUBLIC_PATH: PUBLIC_PATH,
  BACKEND_URL: LAUNCHER_BACKEND_URL,
  LAUNCHER_KEYCLOAK_URL: LAUNCHER_KEYCLOAK_URL,
  LAUNCHER_KEYCLOAK_REALM: LAUNCHER_KEYCLOAK_REALM,
  LAUNCHER_KEYCLOAK_CLIENT_ID: LAUNCHER_KEYCLOAK_CLIENT_ID,
  LAUNCHER_FRONTEND_SENTRY_DSN: LAUNCHER_FRONTEND_SENTRY_DSN
});

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: METADATA.PUBLIC_PATH,
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    // FIXME: https://github.com/webpack/webpack/issues/2644
    // new webpack.optimize.DedupePlugin(),
    // FIXME: webpack's --optimize-minimize option is not working
    //new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'PUBLIC_PATH' : JSON.stringify(METADATA.PUBLIC_PATH),
        'LAUNCHER_BACKEND_URL' : JSON.stringify(METADATA.LAUNCHER_BACKEND_URL),
        'LAUNCHER_KEYCLOAK_URL' : JSON.stringify(METADATA.LAUNCHER_KEYCLOAK_URL),
        'LAUNCHER_KEYCLOAK_REALM' : JSON.stringify(METADATA.LAUNCHER_KEYCLOAK_REALM),
        'LAUNCHER_KEYCLOAK_CLIENT_ID': JSON.stringify(METADATA.LAUNCHER_KEYCLOAK_CLIENT_ID),
        'LAUNCHER_FRONTEND_SENTRY_DSN': JSON.stringify(METADATA.LAUNCHER_FRONTEND_SENTRY_DSN)
      }
    })
  ]
});
