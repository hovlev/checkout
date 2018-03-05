const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    main: ['./src/index.jsx', './src/styles/main.css'],
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname + '/public'),
    filename: 'checkout.js',
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.css'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.(css)$/,
        loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]?css-loader?sourceMap!postcss?sourceMap=inline'),
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({ React: 'react' }),
    new ExtractTextPlugin('checkout.css'),
  ],
  devtool: 'source-map',
};
