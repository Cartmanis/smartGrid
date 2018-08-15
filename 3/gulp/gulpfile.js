/*Это файл-конфигурации или описания по которому gulp собирает проекты.*/
const gulp = require('gulp'); //модуль gulp
const autoprefixer = require('gulp-autoprefixer'); //модуль автопрефиксов
const cleanCSS = require('gulp-clean-css'); //модуль минификации css файлов
const browserSync = require('browser-sync').create(); //модуль синхронизации кода с браузером. -чтобы постоянно не нажимать F5

//В этом объекте храним повторяющиеся пути нужные для gulp
const config = {
    src: './src/',
    css: {
        src: '/precss/**/*.css',
        dest: '/css'
    }
};

/*команда gulp интерфейса gulp-cli запускает данный task (Задача)
для 'default' имя писать не обязательно, для остальных task после gulp
необходимо писать имя: например gulp test*/
gulp.task('build', function () {
    //Запускаем gulp - **/ *.css означает, что мы ещем все вложенные папки */ 
    gulp.src(config.src + config.css.src)
        .pipe(autoprefixer({ //pipe автопрефикса(команды можно найти в документации gulp)
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.src + config.css.dest)) //указываем куда мы получим обработанные файлы
        .pipe(browserSync.reload({ //обновляем изменения в браузере (F5)
            stream: true
        }));
});

gulp.task('browserSync', function () {
    browserSync.init({ //обратить внимание, что команда не gulp, а browserSync
        server: {
            baseDir: config.src //путь где лежит файл index.html
        }
    })
})

//чтобы не запускать и watch и browserSync, можно во втором параметре 
// в массиве указать те задачи, которые нужно запустить до watch
gulp.task('watch', ['browserSync'], function () {
    //при изменении в любом css файле запускаем task 'build'
    gulp.watch(config.src + config.css.src, ['build']);
});