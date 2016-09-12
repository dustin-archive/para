'use strict'

const gulp = require('gulp')

  const sass = require('gulp-sass')
  const postcss = require('gulp-postcss')
    const autoprefixer = require('autoprefixer')

  const jade = require('gulp-jade')

  const browserify = require('browserify')
  const source = require('vinyl-source-stream')

gulp.task('scss', () => {
  return gulp.src('src/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer ]))
    .pipe(gulp.dest('dist'))
})

gulp.task('jade', () => {
  return gulp.src('src/main.jade')
    .pipe(jade({ pretty: true, basedir: __dirname }))
    .pipe(gulp.dest('dist'))
})

gulp.task('js', function() {
  browserify('src/main.js').bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('build', ['scss', 'jade', 'js'])

gulp.task('watch', () => {
  gulp.watch('src/**/*', ['build'])
})
