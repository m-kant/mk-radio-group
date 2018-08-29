
/** All tasks moved to separate files in "build" folder. 
 * Here is only composite task definition and definition of watchers
*/

const gulp		= require('gulp');
const del		= require('del');
const connect   = require('gulp-connect');

let env = process.env.NODE_ENV || 'dev';

gulp.task('clean', function(){ return del(['dist/*']); });

gulp.task('void', function(done){ return done();});

require('./build/gulp.app');
require('./build/gulp.themes');
require('./build/gulp.demo');
require('./build/gulp.doc');
// require('./build/gulp.html');
// require('./build/gulp.libs');

gulp.task('dev', function(){
	
	gulp.watch(['src/*.js', 'src/*.html'], gulp.parallel( 'app:dev' ));
	gulp.watch(['src/*.scss'],             gulp.parallel( 'themes:dev' ));
	gulp.watch(['demo/*.*'],               gulp.parallel( 'demo' ));

	connect.server({
		port: 8082,
		// root: 'dist',
		livereload: true
	  });
});

gulp.task('build', 	  gulp.parallel( 'app:prod', 'themes:prod', 'doc' ));
gulp.task('prod',     gulp.series('clean','build'));
gulp.task('default',  gulp.parallel('dev'));
