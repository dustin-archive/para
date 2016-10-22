const gulp = require('gulp')
const browsersync = require('browser-sync').create()

const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

const jade = require('gulp-jade')

const browserify = require('browserify')
const source = require('vinyl-source-stream')
const uglify = require('gulp-uglify')
const streamify = require('gulp-streamify')

gulp.task('scss', () => {
  return gulp.src('src/main.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules', 'src/components']
    }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer ]))
    .pipe(gulp.dest('dist'))
})

gulp.task('jade', () => {
  return gulp.src('src/index.jade')
    .pipe(jade({
      pretty: true,
      globals: ['src/components'],
      basedir: __dirname
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('js', function() {
  browserify('./src/main.js', { paths: ['./src/components'] }).bundle()
    .pipe(source('main.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('dist'))
})

gulp.task('build', ['scss', 'jade', 'js'], function (done) {
  browsersync.reload()
  done()
})

gulp.task('watch', () => {
  browsersync.init({ server: { baseDir: 'dist/' } })
  gulp.watch('src/**/*', ['build'])
})
