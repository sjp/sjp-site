var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var autoprefixer = require('autoprefixer');

gulp.task('styles:dev', function() {
    return gulp.src('_styles/*.scss')
        .pipe(sass())
        .pipe(postcss([
            cssnext,
            autoprefixer
        ]))
        .pipe(gulp.dest('_site/styles'));
});

gulp.task('styles:prod', function() {
    return gulp.src('_styles/*.scss')
        .pipe(sass())
        .pipe(postcss([
            cssnext,
            autoprefixer
        ]))
        .pipe(cssnano())
        .pipe(gulp.dest('_site/styles'));
});
