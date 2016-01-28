var gulp = require('gulp');
var tasksDir = require('require-dir')('_tasks');

gulp.task('build:dev', ['styles:dev', 'scripts:dev', 'rainbow:dev', 'timing-manager'], function() {

});

gulp.task('build:prod', ['styles:prod', 'scripts:prod', 'rainbow:prod', 'timing-manager'], function() {

});

gulp.task('default', ['build:prod'], function() {

});
