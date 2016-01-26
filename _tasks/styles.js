var gulp = require('gulp');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');

gulp.task('styles', function() {
    return gulp.src('./_styles/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./_site/styles'));
});
