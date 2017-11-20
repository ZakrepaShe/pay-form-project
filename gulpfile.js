'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');


gulp.task('sass', () => {
    return gulp.src('./source/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer("last 2 version", "safari 9"))
        .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest('./output/css/'));
});

gulp.task('js', () =>
    gulp.src('./source/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./output/js/'))
);

gulp.task('pug', () => {
    return gulp.src('./source/blocks/index.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./output/'));
});

gulp.task('sass:watch', () => {
    gulp.watch('./source/scss/*.scss', ['sass']);
    gulp.watch('./source/blocks/*.pug', ['pug']);
});

gulp.task('font', () => {
    return gulp.src('./source/font/*.{ttf,woff,eof,svg}')
        .pipe(gulp.dest('./output/font/'));
});

gulp.task('img', () => {
    return gulp.src('./source/img/*.{png,jpg,svg}')
        .pipe(gulp.dest('./output/img/'));
});

gulp.task('transfer', ['font', 'img']);

gulp.task('default', ['sass', 'pug', 'js', 'transfer']);