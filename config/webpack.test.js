const webpack = require('webpack');
const helpers = require('./helpers');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

const METADATA = Object.assign({}, {
  ENV: ENV,
  PUBLIC_PATH: process.env.PUBLIC_PATH || '/',
  LAUNCHER_BACKEND_URL: process.env.LAUNCHER_BACKEND_URL || 'http://localhost:8080/api',
  LAUNCHER_KEYCLOAK_URL: process.env.LAUNCHER_KEYCLOAK_URL || '',
  LAUNCHER_KEYCLOAK_REALM: process.env.LAUNCHER_KEYCLOAK_REALM || '',
  LAUNCHER_KEYCLOAK_CLIENT_ID: process.env.LAUNCHER_KEYCLOAK_CLIENT_ID || 'openshiftio-public',
  LAUNCHER_FRONTEND_SENTRY_DSN: process.env.LAUNCHER_FRONTEND_SENTRY_DSN
});


module.exports = {

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [helpers.root('src'), 'node_modules']

  },

  module: {

    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/@angular'),
          helpers.root('node_modules/ngx-modal'),
          helpers.root('node_modules/rxjs-compat'),
          helpers.root('node_modules/fabric8-analytics-dependency-editor')
        ]
      },

      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.test.json'
            }
          },
          'angular2-template-loader'
        ],
        exclude: [/\.e2e\.ts$/]
      },
      {
        test: /\.css$/,
        loader: ['to-string-loader', { loader: 'css-loader', options: { url: false } }],
        exclude: [helpers.root('src/index.html')]
      },

      {
        test: /\.scss$/,
        loader: ['raw-loader', 'sass-loader'],
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },

      {
        enforce: 'post',
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        include: helpers.root('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/,
          /keycloak\.js$/
        ]
      }

    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'injectedSettings': undefined,
      'process.env': {
        'HMR': false,
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'PUBLIC_PATH' : JSON.stringify(METADATA.PUBLIC_PATH),
        'LAUNCHER_BACKEND_URL' : JSON.stringify(METADATA.LAUNCHER_BACKEND_URL),
        'LAUNCHER_KEYCLOAK_URL' : JSON.stringify(METADATA.LAUNCHER_KEYCLOAK_URL),
        'LAUNCHER_KEYCLOAK_REALM' : JSON.stringify(METADATA.LAUNCHER_KEYCLOAK_REALM),
        'LAUNCHER_KEYCLOAK_CLIENT_ID': JSON.stringify(METADATA.LAUNCHER_KEYCLOAK_CLIENT_ID),
        'LAUNCHER_FRONTEND_SENTRY_DSN': JSON.stringify(METADATA.LAUNCHER_FRONTEND_SENTRY_DSN)
      }
    }),
    new ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)esm5/,
      helpers.root('src'), // location of your src
      {}
    ),

    new LoaderOptionsPlugin({
      debug: false,
      options: {
      }
    }),

  ],

  performance: {
    hints: false
  },

  node: {
    global: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    fs: 'empty'
  },
  stats: "verbose"
};