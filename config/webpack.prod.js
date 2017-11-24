var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const API_URL = process.env.API_URL || 'http://api.almighty.io/api/';
const BACKEND_URL = process.env.BACKEND_URL;
const LAUNCHPAD_MISSIONCONTROL_URL = process.env.LAUNCHPAD_MISSIONCONTROL_URL;
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/launch';

const METADATA = webpackMerge(commonConfig.metadata, {
  API_URL: API_URL,
  ENV: ENV,
  PUBLIC_PATH: PUBLIC_PATH,
  LAUNCHPAD_MISSIONCONTROL_URL: LAUNCHPAD_MISSIONCONTROL_URL,
  BACKEND_URL: BACKEND_URL
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
        'API_URL' : JSON.stringify(METADATA.API_URL),
        'BACKEND_URL' : JSON.stringify(METADATA.BACKEND_URL),
        'LAUNCHPAD_MISSIONCONTROL_URL': JSON.stringify(METADATA.LAUNCHPAD_MISSIONCONTROL_URL),
        'PUBLIC_PATH' : JSON.stringify(METADATA.PUBLIC_PATH)
      }
    })
  ]
});
