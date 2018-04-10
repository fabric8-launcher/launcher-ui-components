var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const LAUNCHER_BACKEND_URL = process.env.LAUNCHER_BACKEND_URL;
const LAUNCHER_MISSIONCONTROL_URL = process.env.LAUNCHER_MISSIONCONTROL_URL;
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/launch/';

const METADATA = webpackMerge(commonConfig.metadata, {
  ENV: ENV,
  PUBLIC_PATH: PUBLIC_PATH,
  LAUNCHER_MISSIONCONTROL_URL: LAUNCHER_MISSIONCONTROL_URL,
  BACKEND_URL: LAUNCHER_BACKEND_URL
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
        'LAUNCHER_BACKEND_URL' : JSON.stringify(METADATA.LAUNCHER_BACKEND_URL),
        'LAUNCHER_MISSIONCONTROL_URL': JSON.stringify(METADATA.LAUNCHER_MISSIONCONTROL_URL),
        'PUBLIC_PATH' : JSON.stringify(METADATA.PUBLIC_PATH)
      }
    })
  ]
});
