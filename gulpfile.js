var gulp = require('gulp')
var less = require('gulp-less')
var { series, parallel, src, dest } = require('gulp')
const gulpUglify = require('gulp-uglify') //压缩js文件
const gulpCssmin = require('gulp-minify-css') //css压缩
var gulpImagem = require('gulp-imagemin')//图片压缩
const concat = require('gulp-concat')
const gulpHtmlmin = require('gulp-htmlmin')
const clean = require('gulp-clean')
const revCollector = require('gulp-rev-collector')
const connect = require('gulp-connect')

gulp.task('handleHtml', function () {
    return src('src/*.html').pipe(dest('prodbuild/dist'))
})
gulp.task('pages', function () {
    return src('src/pages/**/*.html')
        .pipe(dest('prodbuild/dist/pages'))
})
/**压缩less */
gulp.task('minLess', function () {
    return gulp.src('src/assets/styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('prodbuild/dist/less'))
        .pipe(connect.reload())
});
/**压缩css */
gulp.task('mincss', function () {
    return src('src/assets/styles/*.css')
        .pipe(gulpCssmin()) //   .pipe(concat('main.min.css'))
        .pipe(dest('prodbuild/dist/assets/styles'))
        .pipe(connect.reload())
})
/**压缩js */
gulp.task('minjs', function () {
    return src('./utils/*.js')
        .pipe(gulpUglify()) //  .pipe(concat('main.min.js'))
        .pipe(dest('prodbuild/dist/utils'))
        .pipe(connect.reload())
})
/**压缩image*/
gulp.task('minImage', function () {
    return src('src/assets/images/*') //所有图片
        .pipe(gulpImagem({ progressive: true }))
        .pipe(dest('prodbuild/dist/assets/images'))
        .pipe(connect.reload())
})
/**lib */
gulp.task('copylib', function () {
    return src('lib/**/*')
        .pipe(dest('prodbuild/lib'))
        .pipe(connect.reload())
})

/**监听文件变化 */
gulp.task('watchFileChange', async () => {
    console.log('---**监听文件是否变化**---')
    gulp.watch('src/*.html', gulp.task('concatHtml'))
    gulp.watch('src/assets/styles/*.less', gulp.task('minLess'))
    gulp.watch('src/assets/styles/*.css', gulp.task('mincss'))
    gulp.watch('./utils/*.js', gulp.task('minjs'))
    gulp.watch('src/assets/images/*', gulp.task('minImage'))
})

/**清空dist文件夹 */
gulp.task('clean', function () {
    return gulp.src(['prodbuild/dist/*'])
        .pipe(clean());
});

/**压缩 */
gulp.task('zip', function () {
    return src('prodbuild/dist').pipe()
})
/**启动服务器 */
gulp.task("connect", function () {
    console.log('---启动服务---')
    connect.server({
        root: "prodbuild/dist",
        livereload: true,
        port: '8030'
    });
});

gulp.task('rev', function () {
    return gulp.src(['src/pages/**/*.html', 'src/pages/**/**/*.html'], { base: 'src' })
        .pipe(revCollector({ replaceReved: true }))
        .pipe(gulp.dest('prodbuild/dist/pages'));
});




exports.default = series('handleHtml', 'copylib', 'mincss', 'minjs', 'minImage', 'pages', 'rev', 'watchFileChange','connect')