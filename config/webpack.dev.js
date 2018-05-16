var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.ENV || process.env.NODE_ENV || 'development';
// if env is 'inmemory', the inmemory debug resource is used
const LAUNCHER_BACKEND_URL = process.env.LAUNCHER_BACKEND_URL || 'http://localhost:8080/api';
const LAUNCHER_KEYCLOAK_URL = process.env.LAUNCHER_KEYCLOAK_URL || '';
const LAUNCHER_KEYCLOAK_REALM = process.env.LAUNCHER_KEYCLOAK_REALM || '';
const LAUNCHER_KEYCLOAK_CLIENT_ID = process.env.LAUNCHER_KEYCLOAK_CLIENT_ID || 'openshiftio-public';
const LAUNCHER_FRONTEND_SENTRY_DSN = process.env.LAUNCHER_FRONTEND_SENTRY_DSN;
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

const METADATA = webpackMerge(commonConfig.metadata, {
  ENV: ENV,
  PUBLIC_PATH: PUBLIC_PATH,
  LAUNCHER_BACKEND_URL: LAUNCHER_BACKEND_URL,
  LAUNCHER_KEYCLOAK_URL: LAUNCHER_KEYCLOAK_URL,
  LAUNCHER_KEYCLOAK_REALM: LAUNCHER_KEYCLOAK_REALM,
  LAUNCHER_KEYCLOAK_CLIENT_ID: LAUNCHER_KEYCLOAK_CLIENT_ID,
  LAUNCHER_FRONTEND_SENTRY_DSN: LAUNCHER_FRONTEND_SENTRY_DSN
});

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: METADATA.PUBLIC_PATH,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),

    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
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
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    inline: true
  }
});
