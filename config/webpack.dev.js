var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.ENV || process.env.NODE_ENV || 'development';
// if env is 'inmemory', the inmemory debug resource is used
const API_URL = process.env.API_URL || (ENV==='inmemory'?'app/':'http://localhost:8080/api/');
const LAUNCHPAD_BACKEND_URL = process.env.LAUNCHPAD_BACKEND_URL || 'http://localhost:8080/';
const LAUNCHPAD_MISSION_CONTROL_URL = process.env.LAUNCHPAD_MISSION_CONTROL_URL || 'http://localhost:8180/';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

const METADATA = webpackMerge(commonConfig.metadata, {
  API_URL: API_URL,
  ENV: ENV,
  PUBLIC_PATH: PUBLIC_PATH,
  LAUNCHPAD_BACKEND_URL: LAUNCHPAD_BACKEND_URL,
  LAUNCHPAD_MISSION_CONTROL_URL: LAUNCHPAD_MISSION_CONTROL_URL
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
        'API_URL' : JSON.stringify(METADATA.API_URL),
        'LAUNCHPAD_BACKEND_URL' : JSON.stringify(METADATA.LAUNCHPAD_BACKEND_URL),
        'PUBLIC_PATH' : JSON.stringify(METADATA.PUBLIC_PATH),
        'LAUNCHPAD_MISSION_CONTROL_URL' : JSON.stringify(METADATA.LAUNCHPAD_MISSION_CONTROL_URL),
      }
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    inline: true
  }
});
