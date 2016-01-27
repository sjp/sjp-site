var gulp = require('gulp');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('build-prebuilt-scripts', function() {
    return gulp.src('./_scripts/*.min.js')
        .pipe(gulp.dest('./_site/scripts'));
});

gulp.task('build-regular-scripts', function() {
    return gulp.src(['./_scripts/*.js', '!./_scripts/*.min.js'])
        .pipe(jshint())
        .pipe(uglify())
        .pipe(gulp.dest('./_site/scripts'));
});

gulp.task('build-gridsvg-script', ['build-regular-scripts', 'build-prebuilt-scripts'], function() {
    return gulp.src(['_site/scripts/gridsvg-modernizr.min.js', '_site/scripts/gridsvg-slider.js', '_site/scripts/svg-full-detect.js'])
        .pipe(concat('gridsvg-scripts.js'))
        .pipe(gulp.dest('_site/scripts'));
});

gulp.task('build-video-detect-script', ['build-regular-scripts', 'build-prebuilt-scripts'], function() {
    return gulp.src(['_site/scripts/video-modernizr.min.js', '_site/scripts/video-message.js'])
        .pipe(concat('video-detect.js'))
        .pipe(gulp.dest('_site/scripts'));
});

gulp.task('build-site-main-script', ['build-regular-scripts', 'build-prebuilt-scripts'], function() {
    return gulp.src(['_site/scripts/mail.js', '_site/scripts/ga.js'])
        .pipe(concat('site.js'))
        .pipe(gulp.dest('_site/scripts'));
});

gulp.task('scripts', ['build-gridsvg-script', 'build-video-detect-script', 'build-site-main-script'],  function() {
    return del([
        '_site/scripts/mail.js', '_site/scripts/ga.js',
        '_site/scripts/gridsvg-modernizr.min.js', '_site/scripts/gridsvg-slider.js', '_site/scripts/svg-full-detect.js',
        '_site/scripts/video-modernizr.min.js', '_site/scripts/video-message.js'
    ]);
});

