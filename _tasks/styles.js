var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');

gulp.task('styles:dev', function() {
    return gulp.src('_styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('_site/styles'));
});

gulp.task('styles:prod', function() {
    return gulp.src('_styles/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('_site/styles'));
});
