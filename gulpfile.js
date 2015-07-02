var gulp = require('gulp')
var plumber = require('gulp-plumber')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var minify = require('gulp-minify-css')
var less = require('gulp-less')
var minifyHTML = require('gulp-minify-html')

var environment = 'development'
var paths = {
  src: './app/',
  dest: './public/',
  assets: './assets/'
}

gulp.task('set-production', function() {
  environment = 'production'
})

gulp.task('assets', function() {
  gulp.src(paths.assets + "**")
  .pipe(plumber())
  .pipe(gulp.dest(paths.dest))
})

gulp.task('scripts', function() {
  stream = gulp.src(path.src + 'js/**/*js')
  .pipe(plumber())
  .pipe(concat('all.js'))
  .pipe(gulp.dest(paths.dest + 'js/'))

  if(environment === 'production') stream.pipe(uglify())
})

gulp.task('styles', function() {
  return gulp.src(paths.src + '/css/**/*.less')
  .pipe(less())
  .pipe(minify())
  .pipe(gulp.dest(path.dest + 'css/'))
})

gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(changed(paths.dest))
    .pipe(minifyHTML())
    .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function () {
  gulp.watch(paths.src + 'js/**/*.js', ['scripts']);
  gulp.watch(paths.src + 'css/**/*.less', ['styles']);
  gulp.watch('index.html', ['html']);

  gulp.watch([
      paths.dest + 'js/**/*.js',
      paths.dest + 'css/**/*.css',
      paths.dest + '**/*.html'
    ])
})

gulp.task('compile', ['html', 'styles', 'scripts'])
gulp.task('default', ['assets', 'vendor', 'compile'])
gulp.task('production', ['set-production', 'default'])
