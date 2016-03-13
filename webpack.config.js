var path       = require('path');
var webpack    = require('webpack');

 
module.exports = {
  devtool: 'cheap-module-source-map',
  cache: true,
  plugins:[
    new webpack.ProvidePlugin({
      Promise: 'exports?global.Promise!es6-promise',
      fetch: 'exports?self.fetch!whatwg-fetch',
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ],
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
};