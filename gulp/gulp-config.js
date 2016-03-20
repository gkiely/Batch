var path = require('path');
var join = path.join;

var dir = {
  src: 'src',
  dist: 'dist'
};

var config = {
  dist: dir.dist,
  css:{

  },
  js:{
    input: path.join(dir.src, 'js/app/App.js'),
    devwatch: path.join(dir.src, 'js/**/*.js'),
    watch: path.join(dir.dist, 'js/**/*.js'),
    dist: join(dir.dist, 'js')
  },
  html:{
    src: [path.join(dir.src, 'html/pages/*.html'), path.join(dir.src, 'html/testing/**/*.html')],
    watch: path.join(dir.src, 'html/**/*.html' )
  }
};


module.exports = config;