var gulp = require('gulp');
var requireDir = require('require-dir');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var sass = require('gulp-sass');

var tasksDir = requireDir('./_tasks');

gulp.task('default', ['styles', 'scripts', 'timing-manager', 'rainbow'], function() {

});
