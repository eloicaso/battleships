var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var minify = require('gulp-minify-css')
var less = require('gulp-less')
var changed = require('gulp-changed')
var minifyHTML = require('gulp-minify-html')

var environment = 'development'
var paths = {
  src: './app/',
  dest: './public/',
  assets: './assets/'
}

gulp.task('assets', function() {
  gulp.src(paths.assets + "**")
  .pipe(gulp.dest(paths.dest + 'assets/'))
})

gulp.task('scripts', function() {
  return gulp.src([
    paths.src + 'js/game/*js',
    paths.src + 'js/app.js',
    paths.src + 'js/models/*js',
    paths.src + 'js/collections/*js',
    paths.src + 'js/views/square.js',
    paths.src + 'js/views/board.js',
    paths.src + 'js/router.js',
    paths.src + 'js/controller.js'
  ])

  .pipe(concat('battleships.js'))
  .pipe(uglify())
  .pipe(gulp.dest(paths.dest + 'js/'))
})

gulp.task('styles', function() {
  return gulp.src(paths.src + '/css/**/*.less')
  .pipe(less())
  .pipe(minify())
  .pipe(gulp.dest(paths.dest + 'css/'))
})

gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(changed(paths.dest))
    .pipe(minifyHTML())
    .pipe(gulp.dest(paths.dest))
})

gulp.task('watch', function () {
  gulp.watch(paths.src + 'js/**/*.js', ['scripts'])
  gulp.watch(paths.src + 'css/**/*.less', ['styles'])
  gulp.watch('index.html', ['html'])

  gulp.watch([
      paths.dest + 'js/**/*.js',
      paths.dest + 'css/**/*.css',
      paths.dest + '**/*.html'
    ])
})

gulp.task('compile', ['html', 'styles', 'scripts'])
gulp.task('default', ['assets', 'compile'])
