var fs   = require('fs');
var path = require('path');

var gulp       = require('gulp');
var gulpif     = require('gulp-if');
var gutil      = require('gulp-util');
var plumber    = require('gulp-plumber');
var rename     = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify     = require('gulp-uglify');
var less       = require('gulp-less');
var please     = require('gulp-pleeease');

var watchify   = require('gulp-watchify');
var babelify   = require('babelify');
var shim       = require('browserify-shim');
var streamify  = require('gulp-streamify');

var browserSync = require('browser-sync').create();

var DEST_DIRECTORY  = './public';
var JS_ENTRY_POINT  = './src/client/app.es6';
var CSS_ENTRY_POINT = './src/client/app.less';
var JS_WATCH_FILES  = './src/client/**/*.es6';
var CSS_WATCH_FILES = './src/client/**/*.less';
var EXTERNAL_FILES  = require('./package.json').externalFiles;

var isDevelopment = !process.env.NODE_ENV ||
                    process.env.NODE_ENV === 'development';
var isJsWatching = false;

gulp.task('enable-watch-bundle:js', function() {
  isJsWatching = true;
});

gulp.task('bundle:js', watchify(function(w) {
  return gulp.src(JS_ENTRY_POINT)
    .pipe(gulpif(isDevelopment, plumber(gutil.log)))
    .pipe(w({
      watch:      isJsWatching,
      entries:    JS_ENTRY_POINT,
      extensions: ['.js', '.es6', '.json'],
      debug:      isDevelopment,
      setup: function(bundle) {
        bundle
          .transform(babelify)
          .transform(shim);
      },
    }))
    .pipe(gulpif(!isDevelopment, streamify(uglify())))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest(DEST_DIRECTORY));
}));

gulp.task('bundle:css', function() {
  return gulp.src(CSS_ENTRY_POINT)
    .pipe(gulpif(isDevelopment, plumber(gutil.log)))
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    .pipe(less())
    .pipe(please({ minifier: !isDevelopment }))
    .pipe(gulpif(isDevelopment, sourcemaps.write()))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest(DEST_DIRECTORY))
});

gulp.task('bundle:externals', watchify(function(watchify) {
  Object.keys(EXTERNAL_FILES).forEach(function(filename) {
    var bundle = EXTERNAL_FILES[filename].bundle;
    var source = EXTERNAL_FILES[filename].source;

    gulp.src(source)
      .pipe(gulpif(bundle, watchify({
        watch:      false,
        entries:    source,
        extensions: ['.js', '.es6', '.json'],
        debug:      false,
      })))
      .pipe(gulpif(bundle, streamify(uglify())))
      .pipe(rename(filename))
      .pipe(gulp.dest(DEST_DIRECTORY));
  });
}));

gulp.task('build', ['bundle:js', 'bundle:externals', 'bundle:css']);

gulp.task('watch', [
  'enable-watch-bundle:js',
  'bundle:js',
  'bundle:css',
], function() {
  gulp.watch(CSS_WATCH_FILES, ['bundle:css']);

  // if you don't want to use a temporary web server, please remove this.
  browserSync.init({
    open: false,
    server: {
      baseDir: DEST_DIRECTORY,
    },
  });
});
