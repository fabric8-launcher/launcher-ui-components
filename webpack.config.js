const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'my-lib': './src/index.ts',
    'my-lib.min': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'hub-n-spoke',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          minimize: true,
          sourceMap: true,
          include: /\.min\.js$/,
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: require.resolve('awesome-typescript-loader'),
        }],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
}