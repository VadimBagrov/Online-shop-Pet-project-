const {src, dest, watch, parallel, series} = require('gulp');

const scss          = require('gulp-sass')(require('sass'));
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autroprefixer = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const del           = require('del');


function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
} //Страница в браузере

function cleanDist() {
    return del('dist')
} //Очищает дист

function images() {
    return src('app/images/**/*')
        .pipe(imagemin(
            [
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]
        ))
        .pipe(dest('dist/images'))
} //Сжатие фото

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/mixitup/dist/mixitup.js',
        'app/js/main.js',
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autroprefixer({
            overrideBrowserslist:['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
} //Преобразовывание css в scss и concat(переименовывание),browserSync обновляет браузер при изменениях

function build() {
    return src([
        'app/css/style.min.css' ,
        'app/fonts/**/*' ,
        'app/js/main.min.js',
        'app/*.html'
    ],  {base: 'app'})
    .pipe(dest('dist'))
} //создание модулей в dist

function watching() {
    watch(['app/scss/**/*.scss'],styles)
    watch(['app/js/main.js','!app/js/main.min.js'],scripts)
    watch(['app/*.html']).on('change', browserSync.reload)
} //Слежение за папкой scss всеми папками внутри и файлами(с расширением scss)


exports.styles = styles;
exports.watching = watching; //надо запустить для отслеживания
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles ,scripts,browsersync, watching);
