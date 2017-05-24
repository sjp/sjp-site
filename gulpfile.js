var gulp = require('gulp');
var tasksDir = require('require-dir')('tasks');

gulp.task('build:dev', ['styles:dev', 'scripts:dev', 'rainbow:dev'], function() {

});

gulp.task('build:prod', ['styles:prod', 'scripts:prod', 'rainbow:prod'], function() {

});

gulp.task('default', ['build:prod'], function() {

});
