var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');

gulp.task('styles', function() {
    return gulp.src('_styles/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('_site/styles'));
});
