    // bulkSass      = require('gulp-sass-bulk-import'),
    // cache         = require('gulp-cached'),
    // concat        = require('gulp-concat'),
    // eslint        = require('gulp-eslint'),

var fileInclude   = require('gulp-file-include'),
    config        = require('./gulp-config.js'),
    gulp          = require('gulp'),
    livereload    = require('gulp-livereload'),
    // prefix        = require('gulp-autoprefixer'),
    // react         = require('gulp-react'),
    // remember      = require('gulp-remember');
    // sass          = require('gulp-sass'),
    // sourcemaps    = require('gulp-sourcemaps'),
    webserver     = require('gulp-webserver'),
    // webpack       = require('webpack'),
    webpack       = require('webpack-stream'),
    //Build only
    extend        = require('extend'),
    htmlmin       = function(){},
    minifyCSS     = function(){},
    uglify        = function(){},
    yargs         = require('yargs');


var prod = yargs.argv.prod;
var handleError = function(err) {
  console.log("\x07");
  console.log(err.toString());
  this.emit('end');
};


/*==============================
=            Server            =
==============================*/
gulp.task('server', function(){
  var ip = require('get-my-ip')();
  gulp.src(config.dist)
  .pipe(webserver())
  .pipe(webserver({
    host: ip,
    livereload: true
  }))
});


/*==================================
=            JavaScript            =
==================================*/
gulp.task('webpack:dev', function(cb){
  var wpConfig = prod ? require('./webpack.prod.js') : require('./webpack.config.js');  
  wpConfig.output = {
    filename: 'bundle.js'
  };
  return gulp.src(config.js.input)
  .pipe(webpack(wpConfig))
  .pipe(gulp.dest(config.js.dist))
});


/*============================
=            HTML            =
============================*/
gulp.task('html', function(){
  return gulp.src(config.html.src)
  .pipe(fileInclude({
    prefix: '@@',
    basepath: './src/html'
  }))
  .on('error', handleError)
  .pipe(gulp.dest(config.dist))
  .pipe(livereload())
});


/*=============================
=            Watch            =
=============================*/
gulp.task('watch', function(){
  livereload.listen();
  gulp.watch([config.js.watch]).on('change', livereload.changed);
  gulp.watch(config.html.watch, ['html']);  
});




/*===========================
=            CLI            =
===========================*/
if(prod){
  gulp.task('default', ['webpack:dev']);
}
else{
  gulp.task('default', ['server', 'watch', 'webpack:dev']);  
}
