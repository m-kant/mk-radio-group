const gulp		= require('gulp');
const rename	= require('gulp-rename');
const prefix	= require('gulp-autoprefixer');
const sass		= require('gulp-sass');
const cleanCSS	= require('gulp-clean-css');
const connect   = require('gulp-connect');

const STYLE_SRC = 'src/mk-radio-group.scss';

// DEVELOPMENT
gulp.task('themes:dev', function() {
	return gulp.src(STYLE_SRC)
		.pipe(sass())
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());;
});

// PRODUCTION
gulp.task('themes:prod', function() {
	return gulp.src(STYLE_SRC)
		.pipe(sass())
		.pipe(prefix())
		.pipe(gulp.dest('dist'))
		.pipe(cleanCSS())
		.pipe(rename('mk-radio-group.min.css'))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());;
});