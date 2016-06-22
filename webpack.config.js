var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: ['./index.js'],
    vendor: [
      'd3'
    ]
  },
  output: {
    path: 'dist',
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  devtool: 'inline-source-map',
  debug: true,
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new CleanWebpackPlugin(['./dist']),
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    })
  ],
  eslint: {
    configFile: './.eslintrc'
  }
};
