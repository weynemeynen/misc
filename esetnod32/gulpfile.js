'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    spritesmith = require('gulp.spritesmith'),
    minifyCSS = require('gulp-minify-css');
// 

// * спрайт
gulp.task('sprite', function() {
    var spriteData = gulp.src('images/icons/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss'
        }));
    return spriteData.pipe(gulp.dest('sprites/'));
});

/**
 * styles
 */
gulp.task('style', function() {
    return gulp.src('sass/main.scss')
        .pipe(sass()) // Преобразование scss в css
        .pipe(minifyCSS()) // Минификация стилей
        .pipe(gulp.dest('app/'))
});

gulp.task('assets', function() {
    return gulp.src('images/**')
        .pipe(gulp.dest('app/images'))
})

gulp.task('default', ['style', 'assets']);
