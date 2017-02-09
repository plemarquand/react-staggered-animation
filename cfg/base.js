'use strict';
let path = require('path');
let defaultSettings = require('./defaults');
let pkg = require('../package.json');

module.exports = {
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'index.js',
    publicPath: defaultSettings.publicPath,
    libraryTarget: 'umd',
    library: pkg.name
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  },
  module: {}
};
