var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	plumber = require('gulp-plumber'),
	jscs = require('gulp-jscs');
	
// Paths
var paths = {
	scripts: 'lib/**/*.js'	
};

// JS Hint
gulp.task('jshint', function() {
	return gulp.src(paths.scripts)
		.pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// JSCS
gulp.task('jscs', function() {
	return gulp.src(paths.scripts)
		.pipe(plumber())
        .pipe(jscs())
        .pipe(jscs.reporter());
});

// JavaScript
gulp.task('js', ['jshint', 'jscs']);

// Rerun the task when a file changes 
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['js']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'js']);
