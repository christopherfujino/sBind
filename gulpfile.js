const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('babel', () => {
  gulp.src('es6/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('es5'));
})

gulp.task('default', ['babel'])
