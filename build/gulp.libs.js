const gulp		= require('gulp');
const uglify	= require('gulp-uglify');
const concat    = require('gulp-concat');
const connect   = require('gulp-connect');

/** concats and moves libs to dist folder */

gulp.task('libs', function() {
	return gulp.src('src/libs/**/*.js')
		.pipe(uglify())
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest('dist/media/js'))
		.pipe(connect.reload());;
});