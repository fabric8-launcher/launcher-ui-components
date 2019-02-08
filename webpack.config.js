const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
    filename: 'hub-n-spoke.js',
    libraryTarget: 'umd',
  },
  resolve: {
    aliasFields: ['browser'],
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
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
        ],
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
  }
}