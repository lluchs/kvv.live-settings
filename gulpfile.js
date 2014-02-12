var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');
var requirejs = require('requirejs');

gulp.task('build-node', function() {
  gulp.src([
    'app.js',
    'package.json',
  ]).pipe(gulp.dest('./build'));
});

gulp.task('build-html', function() {
  return gulp.src('public/index.html')
    .pipe(htmlreplace('js', 'bundle.js'))
    .pipe(gulp.dest('./build/public'));
});

gulp.task('build-js', function(cb) {
  optimize({
    baseUrl: 'public/app',
    mainConfigFile: 'public/app/main.js',

    name: '../bower_components/almond/almond',
    wrap: true,
    include: 'main',
    out: 'build/public/bundle.js',
    stubModules: [ 'rv', 'text' ],
  }, cb);
});

gulp.task('build-css', function(cb) {
  optimize({
    cssIn: 'public/style.css',
    out: 'build/public/style.css',
  }, cb);
});

gulp.task('build', ['build-node', 'build-html', 'build-js', 'build-css']);

function optimize(options, cb) {
  requirejs.optimize(options,
    function(result) {
      console.log(result);
      cb();
    },
    cb
  );
}
