var gulp = require('gulp');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var del = require('del');

gulp.task('timing-manager-build', function() {
    // dev
    return gulp.src('_scripts/timing-manager/js/timing.js')
        .pipe(jshint())
        .pipe(gulp.dest('_site/projects/timing-manager/')) // dev
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('_site/projects/timing-manager/')); // prod
});

gulp.task('timing-manager-docs-build', shell.task(
    [ 'yuidoc --norecurse --quiet' ],
    { cwd: '_scripts/timing-manager/' }
));

gulp.task('timing-manager-docs-move', ['timing-manager-docs-build'], function() {
    return gulp.src('_scripts/timing-manager/docs/**/*')
        .pipe(gulp.dest('_site/projects/timing-manager/docs'));
});

gulp.task('timing-manager-docs', ['timing-manager-docs-move'], function() {
    return del(['_scripts/timing-manager/docs']);
});

gulp.task('timing-manager', ['timing-manager-build', 'timing-manager-docs'], function() {

});
