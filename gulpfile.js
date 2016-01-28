var gulp = require('gulp');
var spawn = require('child_process').spawn;
var tasksDir = require('require-dir')('_tasks');

gulp.task('jekyll', function() {
    return spawn('jekyll', ['build'], { stdio: 'inherit' });
});

gulp.task('build:dev', ['styles:dev', 'scripts:dev', 'rainbow:dev', 'timing-manager', 'jekyll'], function() {

});

gulp.task('build:prod', ['styles:prod', 'scripts:prod', 'rainbow:prod', 'timing-manager', 'jekyll'], function() {

});

gulp.task('default', ['build:prod'], function() {

});
