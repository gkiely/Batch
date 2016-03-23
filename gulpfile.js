var 
    // cache         = require('gulp-cached'),
    config        = require('./gulp/gulp-config.js'),
    fileInclude   = require('gulp-file-include'),
    gulp          = require('gulp'),
    livereload    = require('gulp-livereload'),
    // prefix        = require('gulp-autoprefixer'),
    // react         = require('gulp-react'),
    // remember      = require('gulp-remember'),
    // sass          = require('gulp-sass'),
    // sourcemaps    = require('gulp-sourcemaps'),
    // gutil         = require('gulp-util'),
    path          = require('path'),
    webserver     = require('gulp-webserver'),
    // webpack       = require('webpack'),
    webpackStream = require('webpack-stream'),
    //Build only
    extend        = require('extend'),
    gulpif        = require('gulp-if'),
    htmlmin       = function(){},
    minifyCSS     = function(){},
    shell         = require('gulp-shell'),
    uglify        = function(){},
    yargs         = require('yargs');
    // bulkSass      = require('gulp-sass-bulk-import'),
    // concat        = require('gulp-concat'),
    // eslint        = require('gulp-eslint'),


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
  var stream = gulp.src('');
  

  //=== Client testing server
  var client = gulp.src('dist');
  client.pipe(webserver());
  if(ip){
    client.pipe(webserver({
        host: ip,
        livereload: true
    }));
  }


  //== nodejs server (client/admin)
  stream.pipe(shell([
    `nodemon --debug --ignore src/ --ignore dist/ --ignore test/ & 
    node-inspector --preload false`
  ]));

  //=== Start postgres
  var isWin = /^win/.test(process.platform);
  if(isWin){
    // @todo: get windows version working with config
    // http://www.postgresql.org/docs/9.4/static/app-pg-ctl.html
    stream.pipe(shell([
      "%PROGRAMFILES%\PostgreSQL\9.5\bin\pg_ctl.exe -start"
    ]));
  }
  else{
    stream.pipe(shell([
      'open -a Postgres'
    ]));
  }
});


/*==================================
=            JavaScript            =
==================================*/
var wpConfig = prod ? require('./gulp/webpack.prod.js') : require('./gulp/webpack.dev.js');
gulp.task('js', function(cb){

  wpConfig.output = {
    filename: 'bundle.js'
  };
  
  return gulp.src(config.js.input)
  // .pipe(cache('scripts'))
  // babel task here
  // .pipe(remember('scripts'))
  .pipe(webpackStream(wpConfig))
  .on('error', handleError)
  .pipe(gulp.dest(config.js.dist))
  .pipe(livereload())
});


/*============================
=            HTML            =
============================*/
gulp.task('html', function(){
  return gulp.src(config.html.src)
  .pipe(fileInclude({
    prefix: '@@',
    basepath: path.join(config.src, 'html')
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
  gulp.watch(config.js.devwatch, ['js'])
  // gulp.watch(config.js.watch).on('change', livereload.changed);
  gulp.watch(config.html.watch, ['html']);
});




/*===========================
=            CLI            =
===========================*/
if(prod){
  gulp.task('default', ['html', 'js']);
}
else{
  gulp.task('default', ['server', 'watch', 'js']);  
}
