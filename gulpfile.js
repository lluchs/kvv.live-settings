var gulp = require('gulp');
var es = require('event-stream');
var requirejs = require('requirejs');

gulp.task('builddir', function() {
  return es.concat(
    gulp.src([
      'app.js',
      'package.json',
    ]).pipe(gulp.dest('./build')),
    gulp.src([
      'public/index.html',
    ]).pipe(gulp.dest('./build/public')),
    gulp.src([
      'public/bower_components/requirejs/require.js',
    ]).pipe(gulp.dest('./build/public/bower_components/requirejs'))
  );
});

gulp.task('build-js', ['builddir'], function(cb) {
  optimize({
    baseUrl: 'public/app',
    mainConfigFile: 'public/app/main.js',

    name: 'main',
    out: 'build/public/app/main.js',
    stubModules: [ 'rv', 'text' ],
  }, cb);
});

gulp.task('build-css', ['builddir'], function(cb) {
  optimize({
    cssIn: 'public/style.css',
    out: 'build/public/style.css',
  }, cb);
});

gulp.task('build', ['build-js', 'build-css']);

function optimize(options, cb) {
  requirejs.optimize(options,
    function(result) {
      console.log(result);
      cb();
    },
    cb
  );
}
