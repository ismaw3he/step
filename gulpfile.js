const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      sass = require('gulp-sass'),
      minifyCSS = require('gulp-csso'),
      minifyImg = require('gulp-imagemin'),
      terser = require('gulp-terser'),
      concat = require('gulp-concat'),
      autoprefixer = require('gulp-autoprefixer'),
      del = require('del');



/* TASK */
gulp.task('browser-sync', (cb) => {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/scss/**/*.scss", gulp.series('css'));
    gulp.watch("src/js/**/*.js", gulp.series('js'));
    gulp.watch("src/img/**/*", gulp.series('img'));
    gulp.watch("src/**/*.html", gulp.series('html'));
});

gulp.task('html', (cb) => {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
    cb();
});

gulp.task('css', (cb) => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(autoprefixer())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', (cb) => {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('img', (cb) => {
    gulp.src('src/img/**/*')
        .pipe(minifyImg())
        .pipe(gulp.dest('dist/img'));
    cb();
});


gulp.task('delete', (cb) => del(['dist/css', 'dist/js', 'dist/img', 'dist/**/*.html']));

gulp.task('build', gulp.series(
        'delete',
        'html',
        'css',
        'js',
        'img',
        'browser-sync'
    )
);