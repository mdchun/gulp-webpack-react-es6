'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var shrink = require('gulp-cssshrink');
var rename = require('gulp-rename');
var gutil = require('gutil');

// 静态文件打包合并
var webpack = require('gulp-webpack');
var WebpackDevServer = require("webpack-dev-server");


// MD5戳
var rev = require('gulp-rev');

var config = require('./webpack.config');

gulp.task('js', function () {
  gulp.src('./src/js/**/*.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('./build/'))
    .pipe(uglify())
    .pipe(rename({ extname : '.min.js' }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('css', function () {
  gulp.src(['./css/main.css', './css/view.css'])
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./build/'));
});
gulp.task('publish-js', function () {
  return gulp.src(['./js'])
    .pipe(webpack(config))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./build'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/rev/js'));
});
gulp.task('publish-css', function () {
  return gulp.src(['./css/main.css', './css/view.css'])
    .pipe(concat('app.css'))
    .pipe(shrink())
    .pipe(rev())
    .pipe(gulp.dest('./build'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/rev/css'));
});
gulp.task('watch', function () {
  gulp.watch('./src/**/*.css', ['css']);
  gulp.watch('./src/**/*.js', ['js']);
});


gulp.task("server", function(callback) {
    // config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080");
    var compiler = webpack(config);
    var server = new WebpackDevServer(compiler, {

    });
	server.listen(8080);
});

gulp.task('default',function(){
	gulp.start('watch');
})