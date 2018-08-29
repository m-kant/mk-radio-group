

const gulp		= require('gulp');
const uglify	= require('gulp-uglify');
const rename	= require('gulp-rename');
const rigger	= require('gulp-rigger');
const concat    = require('gulp-concat');
const babel     = require('gulp-babel');
const connect   = require('gulp-connect');

const JS_SRC = ['src/mk-radio-group.js'];

// DEVELOPMENT
gulp.task('app:dev', function() {
	return gulp.src( JS_SRC )
		.pipe(rigger())
		.pipe(babel({
            presets: ['env'],
        }))
		// .pipe(concat('app.js'))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

// PRODUCTION
gulp.task('app:prod', function() {
	return gulp.src( JS_SRC )
		.pipe(rigger())
		.pipe(babel({
            presets: ['env'],
        }))
		// .pipe(concat('app.js'))
		.pipe(gulp.dest('dist'))
		.pipe(uglify())
		.pipe(rename('mk-radio-group.min.js'))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});