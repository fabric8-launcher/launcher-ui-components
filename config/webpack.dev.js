const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const EvalSourceMapDevToolPlugin = require('webpack/lib/EvalSourceMapDevToolPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

const METADATA = Object.assign({}, {
  ENV: ENV,
  PUBLIC_PATH: process.env.PUBLIC_PATH || '/',
  LAUNCHER_BACKEND_URL: process.env.LAUNCHER_BACKEND_URL || 'http://localhost:8080/api',
  LAUNCHER_KEYCLOAK_URL: process.env.LAUNCHER_KEYCLOAK_URL || '',
  LAUNCHER_KEYCLOAK_REALM: process.env.LAUNCHER_KEYCLOAK_REALM || '',
  LAUNCHER_KEYCLOAK_CLIENT_ID: process.env.LAUNCHER_KEYCLOAK_CLIENT_ID || 'openshiftio-public',
  LAUNCHER_FRONTEND_SENTRY_DSN: process.env.LAUNCHER_FRONTEND_SENTRY_DSN
});

module.exports = webpackMerge(commonConfig({ env: ENV, metadata: METADATA  }), {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: METADATA.PUBLIC_PATH,
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    library: 'ac_[name]',
    libraryTarget: 'var',
  },

  plugins: [
    new EvalSourceMapDevToolPlugin({
      moduleFilenameTemplate: '[resource-path]',
      sourceRoot: 'webpack:///'
    }),
    new LoaderOptionsPlugin({
      debug: true,
      options: { }
    }),

  ],
  devServer: {
    contentBase: helpers.root('src'),
    historyApiFallback: true,
    stats: 'minimal',
    inline: true,
    open: false,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    fs: 'empty'
  }
});
