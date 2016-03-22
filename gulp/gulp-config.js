var path = require('path');
var join = path.join;

var dir = {
  src: 'src/client',
  dist: 'dist/client'
};

var config = {
  src: dir.src,
  dist: dir.dist,
  css:{

  },
  js:{
    input: join(dir.src, 'js/app/App.js'),
    devwatch: join(dir.src, 'js/**/*.js'),
    watch: join(dir.dist, 'js/**/*.js'),
    dist: join(dir.dist, 'js')
  },
  html:{
    src: [join(dir.src, 'html/pages/*.html'), join(dir.src, 'html/testing/**/*.html')],
    watch: join(dir.src, 'html/**/*.html' )
  }
};


module.exports = config;