const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const eslint = require('gulp-eslint')
const rollup = require('gulp-better-rollup')
const babel = require('rollup-plugin-babel')
const browserSync = require('browser-sync').create()

gulp.task('sass', () => {
    return gulp.src('./sass/main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
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

gulp.task('rollup', () => {
    return gulp.src('./js/start.js')
    .pipe(rollup({
        plugins: [
            babel({
                exclude: './node_modules',
                presets: [
                    '@babel/preset-env'
                ]
            })    
        ]
    }, {
        format: 'iife',
        file: 'main.js'
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch-js', () => {
    gulp.watch([
        './js/*.js'
    ], gulp.series('lint', 'rollup')).on('change', browserSync.reload)
})

gulp.task('default', gulp.parallel(() => {
    browserSync.init({
        server: './',
        port: 8080
    })
}, 'watch-sass', 'watch-js'))









// const rollup = require('gulp-better-rollup')
// const babel = require('rollup-plugin-babel')

// gulp.task('rollup', () => {
//     return gulp.src('./js/main.js')
//     .pipe(rollup({
//         plugins: [
//             babel({
//                 exclude: './node_modules',
//                 presets: ['@babel/preset-env']
//             })    
//         ]
//     }, {
//         format: 'iife'
//     }))
//     .pipe(gulp.dest('./dist/'))
// })