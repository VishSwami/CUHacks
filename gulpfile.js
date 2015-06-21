var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var del = require('del')
var browserify = require('browserify')
var watchify = require('watchify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload

var argv = process.argv.slice(2)
var args = {
  production: argv.indexOf('--production') > -1,
  force: argv.indexOf('--build') > -1
}

gulp.task('bs-reload', reload)

gulp.task('serve', ['build'], function () {

  browserSync.init({
    server: { baseDir: 'public' },
    port: 1337
  })

  gulp.watch(['app/styles/**/*.{styl,css}'], ['styles'])
  gulp.watch(['app/assets/index.html'], ['copy'])
  gulp.watch(['public/index.html'], ['bs-reload'])

})

gulp.task('styles', styles)
gulp.task('scripts', scripts)
gulp.task('copy', copy)

function styles () {
  return gulp.src('app/styles/index.styl')
    .pipe($.if(!args.production, $.plumber()))
    .pipe($.if(!args.production, $.sourcemaps.init()))
    .pipe($.stylus())
    .pipe($.autoprefixer())
    .pipe($.if(args.production, $.minifyCss()))
    .pipe($.if(!args.production, $.sourcemaps.write()))
    .pipe($.rename('app.css'))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe($.if(!args.production, reload({ stream: true })))
}

function scripts () {
  var opts = {
    entries: ['./app/scripts/index.js'],
    debug: !args.production
  }
  var b = args.production ? browserify(opts) : watchify(browserify(opts), watchify.args)
  if (!args.production) b.on('update', bundle)
  b.transform('babelify')
  function bundle () {
    return b
      .bundle()
      .on('error', function (err) { $.util.log('Browserify Error:', err.message) })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe($.if(!args.production, $.sourcemaps.init({ loadMaps: true })))
      .pipe($.if(args.production, $.uglify()))
      .pipe($.if(!args.production, $.sourcemaps.write()))
      .pipe(gulp.dest('public/javascripts'))
      .pipe($.if(!args.production, reload({ stream: true })))
      .pipe($.size({ title: 'scripts unminified' }))
  }
  bundle()
}

function copy () {
  return gulp.src('app/assets/**/*')
    .pipe(gulp.dest('public'))
}

gulp.task('build', ['copy', 'styles', 'scripts'])

gulp.task('clean', function (cb) {
  del(['public'], cb)
})

gulp.task('default', ['build'])
