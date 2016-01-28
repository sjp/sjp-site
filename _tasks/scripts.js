var gulp = require('gulp');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('build-prebuilt-scripts', function() {
    return gulp.src('_scripts/*.min.js')
        .pipe(gulp.dest('_site/scripts'));
});

gulp.task('build-scripts:dev', function() {
    return gulp.src(['_scripts/*.js', '!_scripts/*.min.js'])
        .pipe(jshint())
        .pipe(gulp.dest('_site/scripts'));
});

gulp.task('build-scripts:prod', function() {
    return gulp.src(['_scripts/*.js', '!_scripts/*.min.js'])
        .pipe(jshint())
        .pipe(uglify())
        .pipe(gulp.dest('_site/scripts'));
});

gulp.task('build-gridsvg-script:dev', ['build-scripts:dev', 'build-prebuilt-scripts'], function() {
    return gulp.src(['_site/scripts/gridsvg-modernizr.min.js', '_site/scripts/gridsvg-slider.js', '_site/scripts/svg-full-detect.js'])
        .pipe(concat('gridsvg-scripts.js'))
        .pipe(gulp.dest('_site/scripts'));
});

gulp.task('build-gridsvg-script:prod', ['build-scripts:prod', 'build-prebuilt-scripts'], function() {
    return gulp.src(['_site/scripts/gridsvg-modernizr.min.js', '_site/scripts/gridsvg-slider.js', '_site/scripts/svg-full-detect.js'])
        .pipe(concat('gridsvg-scripts.js'))
        .pipe(gulp.dest('_site/scripts'));
});

gulp.task('build-video-detect-script:dev', ['build-scripts:dev', 'build-prebuilt-scripts'], function() {
    return gulp.src(['_site/scripts/video-modernizr.min.js', '_site/scripts/video-message.js'])
        .pipe(concat('video-detect.js'))
        .pipe(gulp.dest('_site/scripts'));
});

gulp.task('build-video-detect-script:prod', ['build-scripts:prod', 'build-prebuilt-scripts'], function() {
    return gulp.src(['_site/scripts/video-modernizr.min.js', '_site/scripts/video-message.js'])
        .pipe(concat('video-detect.js'))
        .pipe(gulp.dest('_site/scripts'));
});

gulp.task('build-site-main-script:dev', ['build-scripts:dev', 'build-prebuilt-scripts'], function() {
    return gulp.src(['_site/scripts/mail.js', '_site/scripts/ga.js'])
        .pipe(concat('site.js'))
        .pipe(gulp.dest('_site/scripts'));
});

gulp.task('build-site-main-script:prod', ['build-scripts:prod', 'build-prebuilt-scripts'], function() {
    return gulp.src(['_site/scripts/mail.js', '_site/scripts/ga.js'])
        .pipe(concat('site.js'))
        .pipe(gulp.dest('_site/scripts'));
});

gulp.task('scripts:dev', ['build-gridsvg-script:dev', 'build-video-detect-script:dev', 'build-site-main-script:dev'],  function() {
    return del([
        '_site/scripts/mail.js', '_site/scripts/ga.js',
        '_site/scripts/gridsvg-modernizr.min.js', '_site/scripts/gridsvg-slider.js', '_site/scripts/svg-full-detect.js',
        '_site/scripts/video-modernizr.min.js', '_site/scripts/video-message.js'
    ]);
});

gulp.task('scripts:prod', ['build-gridsvg-script:prod', 'build-video-detect-script:prod', 'build-site-main-script:prod'],  function() {
    return del([
        '_site/scripts/mail.js', '_site/scripts/ga.js',
        '_site/scripts/gridsvg-modernizr.min.js', '_site/scripts/gridsvg-slider.js', '_site/scripts/svg-full-detect.js',
        '_site/scripts/video-modernizr.min.js', '_site/scripts/video-message.js'
    ]);
});

