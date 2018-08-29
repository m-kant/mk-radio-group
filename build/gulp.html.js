
const gulp		= require('gulp');
const rigger	= require('gulp-rigger');
const htmlmin	= require('gulp-htmlmin');
const connect   = require('gulp-connect');

// DEVELOPMENT
gulp.task('html:dev', function() {
	return gulp.src(
			'src/index.html'
		)
		.pipe(rigger())
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

// PRODUCTION
gulp.task('html:prod', function() {
	return gulp.src(
			'src/index.html'
		)
		.pipe(rigger())
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyCSS:true,
			minifyJS:true,
			removeComments:true,
			removeRedundantAttributes:false,
			processScripts:['text/template','text/simple-template','text/x-jsrender']
		}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});
