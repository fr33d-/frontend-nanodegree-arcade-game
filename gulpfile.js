var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require("gulp-connect");
var livereload = require('gulp-livereload');
var prettier = require('gulp-prettier');

gulp.task('connect', function () {
	return connect.server({
        port: 8070,
        root: ".",
        livereload: {
            port: 35755
        }
    });
});

gulp.task('sass', function () {
  return gulp.src('./css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(['./css/*.scss', './*.html'], ['sass']);
});

gulp.task('watch', ['sass'], function() {
	gulp.watch([
	    './*.html',
	    './css/*.scss',
	    './js/*js'
	]).on('change', function (file) {
	    gulp.src( file.path)
	        .pipe(connect.reload() );
	});
});

gulp.task('prettier', () => {
    gulp.src(['./**/*.js', './**/*.scss'])
    .pipe(prettier({useFlowParser: true}))
    .pipe(gulp.dest('./dist'))
});

livereload({ start: true });

//Todo or nice to have:
//1. JS Hint
//2. ES6 backward compiling, Bable
//3. Prettier


gulp.task('default', [ 'sass', 'sass:watch', 'watch', 'connect' ]);
