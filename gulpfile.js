'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

// sass
gulp.task('sass', function () {
  return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

// sass-watch
gulp.task('sass:watch', function () {
  gulp.watch('./css/*.scss', ['sass']);
});

// browser-sync -function
gulp.task('browser-sync', function () {
   var files = [
      './*.html',
      './css/*.css',
      './img/*.{png,jpg,gif}',
      './js/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "./"
      }
   });

});

// default task
gulp.task('default', ['browser-sync'], function() {
    gulp.start('sass:watch');
});

// clean (del)
gulp.task('clean', function() {
    return del(['dist']);
});

// copy fonts - copyfonts
gulp.task('copyfonts', function() {
   gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
});

// imagemin
gulp.task('imagemin', function() {
  return gulp.src('img/*.{png,jpg,gif}')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'));
});

// usemin + modules
gulp.task('usemin', function() {
  return gulp.src('./*.html')
  .pipe(flatmap(function(stream, file){
      return stream
        .pipe(usemin({
            css: [ rev() ],
            html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
            js: [ uglify(), rev() ],
            inlinejs: [ uglify() ],
            inlinecss: [ cleanCss(), 'concat' ]
        }))
    }))
    .pipe(gulp.dest('dist/'));
});

// build (& clean)
gulp.task('build',['clean'], function() {
    gulp.start('copyfonts','imagemin','usemin');
});

