const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const sourcePath = path.join(__dirname, './static/src');
const outputPath = path.join(__dirname, './../build');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  
  entry: {
    'main' : './static/src/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-router-config',
      'mobx',
      'mobx-react'
    ]
  },
  output: {
    path: outputPath,
    filename: 'assets/js/[name].js',
  },
  module: {

    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              // presets: ['es2015', 'react'],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader']
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: [
          /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/
        ],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: '/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '/fonts/[name].[ext]',
        },
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      sourcePath,
      'node_modules'
    ]
  },
  plugins: [
    new ExtractTextPlugin('assets/css/[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity,
      filename: 'assets/js/[name].js'
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html',
      template: './static/public/index.html'
    })
  ]
};