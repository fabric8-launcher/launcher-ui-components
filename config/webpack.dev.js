var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.ENV || process.env.NODE_ENV || 'development';
// if env is 'inmemory', the inmemory debug resource is used
const LAUNCHER_BACKEND_URL = process.env.LAUNCHER_BACKEND_URL || 'http://localhost:8080/api';
const LAUNCHER_MISSIONCONTROL_URL = process.env.LAUNCHER_MISSIONCONTROL_URL || 'ws://localhost:8080';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

const METADATA = webpackMerge(commonConfig.metadata, {
  ENV: ENV,
  PUBLIC_PATH: PUBLIC_PATH,
  LAUNCHER_BACKEND_URL: LAUNCHER_BACKEND_URL,
  LAUNCHER_MISSIONCONTROL_URL: LAUNCHER_MISSIONCONTROL_URL
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
        'LAUNCHER_BACKEND_URL' : JSON.stringify(METADATA.LAUNCHER_BACKEND_URL),
        'PUBLIC_PATH' : JSON.stringify(METADATA.PUBLIC_PATH),
        'LAUNCHER_MISSIONCONTROL_URL' : JSON.stringify(METADATA.LAUNCHER_MISSIONCONTROL_URL),
      }
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    inline: true
  }
});
