
const gulp		= require('gulp');
const connect   = require('gulp-connect');

/** almost nothing to do. Just reload on edit */
gulp.task('demo', function() {
	return gulp.src('demo/*.*')
		.pipe(connect.reload());
});
