const webpack = require('webpack');
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin')

const ngcWepack = require('ngc-webpack');

module.exports = function ({ env, metadata }) {
  const gitRevisionPlugin = new GitRevisionPlugin();
  const isProd = env === 'production';
  const entry = {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts',
    main:      './src/main.ts',
  };
  return {
    entry: entry,
    resolve: {
      mainFields: ['browser', 'module', 'main' ],
      extensions: ['.ts', '.js', '.json'],
      modules: [helpers.root('src'), helpers.root('node_modules')]
    },
    module: {

      rules: [
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack'
        },
        {
          test: /\.css$/,
          exclude: helpers.root('src', 'app'),
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: true}},
            'postcss-loader',
          ],
        },

        {
          test: /\.css$/,
          include: helpers.root('src', 'app'),
          use: ['raw-loader', 'postcss-loader'],
        },

        {
          test: /\.scss$/,
          exclude: helpers.root('src', 'app'),
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: true}},
            'postcss-loader',
            'resolve-url-loader',
            { loader: 'sass-loader', options: { sourceMap: true}}
          ],
        },

        {
          test: /\.scss$/,
          include: helpers.root('src', 'app'),
          use: [
            'to-string-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[hash].[ext]'
              }
            }
          ]
        }
      ],

    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'ENV': JSON.stringify(metadata.ENV),
          'NODE_ENV': JSON.stringify(metadata.ENV),
          'PUBLIC_PATH' : JSON.stringify(metadata.PUBLIC_PATH),
          'LAUNCHER_FRONTEND_COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
          'LAUNCHER_BACKEND_URL' : JSON.stringify(metadata.LAUNCHER_BACKEND_URL),
          'LAUNCHER_KEYCLOAK_URL' : JSON.stringify(metadata.LAUNCHER_KEYCLOAK_URL),
          'LAUNCHER_KEYCLOAK_REALM' : JSON.stringify(metadata.LAUNCHER_KEYCLOAK_REALM),
          'LAUNCHER_KEYCLOAK_CLIENT_ID': JSON.stringify(metadata.LAUNCHER_KEYCLOAK_CLIENT_ID),
          'LAUNCHER_FRONTEND_SENTRY_DSN': JSON.stringify(metadata.LAUNCHER_FRONTEND_SENTRY_DSN)
        }
      }),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        helpers.root('src')
      ),
      new ngcWepack.NgcWebpackPlugin({
        mainPath: entry.main,
        tsConfigPath: 'tsconfig.json',
        sourceMap: true,
        skipCodeGeneration: true
      }),
      new MiniCssExtractPlugin({ filename: '[name]-[chunkhash].css' }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: function (a, b) {
          const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
          return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
        },
        minify: isProd ? {
          caseSensitive: true,
          collapseWhitespace: true,
          keepClosingSlash: true
        } : false
      }),
      new ScriptExtHtmlWebpackPlugin({
        sync: /inline|polyfills|vendor/,
        defaultAttribute: 'async',
        preload: [/polyfills|vendor|main/],
        prefetch: [/chunk/]
      }),
      new LoaderOptionsPlugin({}),
    ],
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
};
