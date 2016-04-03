var path = require('path');
var join = path.join;

var src = 'src';
var dist = 'dist';

var config = {
  src: src,
  dist: dist,
  html:{
    src: [join(src, 'html/pages/*.html'), join(src, 'html/testing/**/*.html')],
    watch: join(src, 'html/**/*.html' )
  },
  js:{
    input: join(src, 'js/app/App.js'),
    devwatch: join(src, 'js/**/*.js'),
    watch: join(dist, 'js/**/*.js'),
    dist: join(dist, 'js')
  },
  sass:{
    src: join(src, 'sass/*.scss'),
    dist: join(dist, 'css'),
    watch: join(src, 'sass/**/*.scss')
  }
};


module.exports = config;