const gulp = require('gulp'); //модуль gulp
const autoprefixer = require('gulp-autoprefixer'); //модуль автопрефиксов
const cleanCSS = require('gulp-clean-css'); //модуль минификации css файлов
const browserSync = require('browser-sync').create(); //модуль синхронизации кода с браузером. -чтобы постоянно не нажимать F5
const sourcemaps = require('gulp-sourcemaps'); //модуль для удобной работы в браузере с минифицированными файлами
const media = require('gulp-group-css-media-queries'); //модуль media из ДЗ-
//групируем все media запросы с разных мест в одно
const prepoc = require('gulp-sass');

//В этом объекте храним повторяющиеся пути нужные для gulp
const config = {
    src: './src/',
    css: {
        watch: '/precss/**/*.scss', //следим за всеми файлами
        //билдим только основной файл styles.less( который подключает вспомогательные файлы)
        src: '/precss/styles.scss',
        dest: '/css'
    },
    html: {
        src: '/index.html', //Дз
    }
};


gulp.task('build', function () {
    //Запускаем gulp - **/ *.css означает, что мы ещем все вложенные папки */ 
    gulp.src(config.src + config.css.src)
        .pipe(sourcemaps.init())
        .pipe(prepoc())
        .pipe(media()) //использование media из Д/З 
        .pipe(autoprefixer({ //pipe автопрефикса(команды можно найти в документации gulp)
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.')) //вызываем до dest
        .pipe(gulp.dest(config.src + config.css.dest)) //указываем куда мы получим обработанные файлы        
        .pipe(browserSync.reload({ //обновляем изменения в браузере (F5)
            stream: true
        }));


});

//Отдельная задача, которая будет следить за главным файлом index.html
gulp.task('htmlWatch', function () {
    gulp.src(config.src + config.html.src)
        .pipe(browserSync.reload({
            stream: true
        }));
});

//чтобы не запускать и watch и browserSync, можно во втором параметре 
// в массиве указать те задачи, которые нужно запустить до watch
gulp.task('watch', ['browserSync'], function () {
    //при изменении в любом css файле запускаем task 'build'
    gulp.watch(config.src + config.css.watch, ['build']);
    gulp.watch(config.src + config.html.src, browserSync.reload);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: config.src
        }
    });
});