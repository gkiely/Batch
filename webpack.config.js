var path       = require('path');
var webpack    = require('webpack');
 
module.exports = {
  watch: true,
  devtool: 'cheap-module-source-map',
  cached: true,
  cachedAssets: true,
  // plugins:[
  //   new livereload()
  // ],
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