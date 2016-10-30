//
// # Dependencies
// =============================================================================

const gulp = require('gulp')
const plumber = require('gulp-plumber')

const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

const jade = require('gulp-jade')

const browserify = require('browserify')
const source = require('vinyl-source-stream')
const uglifyify = require('uglifyify')

const browsersync = require('browser-sync').create()

//
// # Global
// =============================================================================

var prod = false

//
// # Compile
// =============================================================================

gulp.task('html', () => {
  return gulp.src('src/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: !prod,
      basedir: __dirname
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('css', () => {
  return gulp.src(['src/main.scss', 'src/notify.scss'])
    .pipe(sass({
      outputStyle: prod ? 'compressed' : 'expanded',
      includePaths: ['node_modules', 'src/components']
    }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer ]))
    .pipe(gulp.dest('dist'))
})

gulp.task('js', () => {
  var bundler = browserify('./src/main.js', { paths: ['./src/components'] })
  if (prod) bundler.transform({ global: true }, 'uglifyify')
  return bundler.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('assets', () => {
  return gulp.src('src/assets/*').pipe(gulp.dest('dist/assets'))
})

//
// # Automation
// =============================================================================

gulp.task('prod', () => prod = true)
gulp.task('prod:true', ['prod'])

gulp.task('build', ['html', 'css', 'js', 'assets'])
gulp.task('build:prod', ['prod:true', 'build'])

gulp.task('reload', ['build'], () => browsersync.reload())

gulp.task('watch', () => {
  browsersync.init({ server: { baseDir: 'dist' } })
  gulp.watch('src/**/*', ['reload'])
})
