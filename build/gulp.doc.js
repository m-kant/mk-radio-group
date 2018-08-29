
const gulp      = require('gulp');
const docum     = require('gulp-documentation');


// Generating API documentation
gulp.task('doc', function () {
    docOptions = {
        filename:   'README.md'
    };
    formatterOptions = {
        allowEmpty: true,
    };
    return gulp.src('./src/mk-radio-group.js')
      .pipe(docum('md', docOptions, formatterOptions))
      .pipe(gulp.dest('./'));
  });


