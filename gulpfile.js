var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Browser Sync
gulp.task('browserSync', function(done) {
  browserSync.init({
    server: {
      baseDir: ["./", "./src"]
    },
  });
  done();
});

// Sass Compile

gulp.task('sass', function(done) {
	return gulp.src('src/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({
		stream: true
	})) 
	done();
});

// Watch Function

gulp.task('watch', gulp.series(gulp.parallel('browserSync', 'sass'), function() {
	gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('src/*.html').on('change', browserSync.reload);
	gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
}));