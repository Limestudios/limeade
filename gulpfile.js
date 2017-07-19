var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

var outputPath = 'dist';

gulp.task('browser-sync', ['clean', 'watch'], function() {
    browserSync({
        notify: true,
        server: {
            baseDir: outputPath,
            port: 3000
        }
    });
});

gulp.task('html', function() {
  return gulp.src('html/*.html')
    .pipe(gulp.dest(outputPath))
    .pipe(browserSync.stream());
});

gulp.task('css',function() {
  return gulp.src("scss/main.scss")
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(outputPath + "/css"))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('js/*.js')
    .pipe(gulp.dest(outputPath + "/js"))
    .pipe(browserSync.stream());
});

gulp.task('clean', function() {
  return gulp.src(outputPath + "/*/*.*", {read: false})
    .pipe(clean());
});

gulp.task('watch', ['clean'], function() {
  gulp.watch(['html/*.html'], ['html']);
  gulp.watch(['scss/*.scss'], ['css']);
  gulp.watch(['js/*.js'], ['js']);
});

gulp.task('default', ['clean', 'watch', 'browser-sync', 'js', 'html', 'css']);