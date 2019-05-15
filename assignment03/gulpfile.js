const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const eslint = require('gulp-eslint')

gulp.task('sass', () => {
    return gulp.src('./sass/main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
})

gulp.task('watch-sass-init', () => {
    gulp.watch([
        './sass/*.sass',
        './sass/*.scss',
        './sass/*.css'
    ], gulp.series('sass'))
})

gulp.task('watch-sass', gulp.series(['sass', 'watch-sass-init']))

gulp.task('lint', () => {
    return gulp.src('./js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('watch-js', () => {
    gulp.watch([
        './js/*.js'
    ], gulp.series('lint'))
})

gulp.task('default', gulp.parallel(['watch-sass', 'watch-js']))
