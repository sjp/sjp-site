var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');

gulp.task('styles:dev', function() {
    return gulp.src('themes/SJP/styles/*.scss')
        .pipe(sass())
        .pipe(postcss([cssnext]))
        .pipe(gulp.dest('themes/SJP/static/styles'));
});

gulp.task('styles:prod', function() {
    return gulp.src('themes/SJP/styles/*.scss')
        .pipe(sass())
        .pipe(postcss([cssnext]))
        .pipe(cssnano())
        .pipe(gulp.dest('themes/SJP/static/styles'));
});
