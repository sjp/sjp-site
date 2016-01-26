var gulp = require('gulp');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('rainbow-themes', function() {
    return gulp.src('./_styles/rainbow/*.css')
        .pipe(cssnano())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./_site/projects/rainbow/themes'));
});

gulp.task('rainbow-code-pre-combine', function() {
    return gulp.src(['_scripts/rainbow/language/*.js', '_scripts/rainbow/demo.js'])
        .pipe(jshint())
        .pipe(uglify())
        .pipe(concat('rainbow-demo-lang.min.js'))
        .pipe(gulp.dest('_site/projects/rainbow/js'));
});

gulp.task('rainbow-code-combine', ['rainbow-code-pre-combine'], function() {
    return gulp.src(['_scripts/rainbow/rainbow.min.js', './_site/projects/rainbow/js/rainbow-demo-lang.min.js'])
        .pipe(concat('rainbow-demo.min.js'))
        .pipe(gulp.dest('_site/projects/rainbow/js'));
});

gulp.task('rainbow-code', ['rainbow-code-combine'], function() {
    return del('./_site/projects/rainbow/js/rainbow-demo-lang.min.js');
});

gulp.task('rainbow', ['rainbow-themes', 'rainbow-code'], function() {

});
