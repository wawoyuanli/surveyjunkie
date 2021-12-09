
const gulpLess = require('gulp-less')
const { parallel, series, src, dest, task, watch } = require('gulp')
const gulpUglify = require('gulp-uglify') //压缩js文件
const gulpCssmin = require('gulp-minify-css') //css压缩
const gulpImagem = require('gulp-imagemin')//图片压缩
const gulpHtmlmin = require('gulp-htmlmin') //压缩html文件
const clean = require('gulp-clean')
// const connect = require('gulp-connect')
const prefixer = require('gulp-autoprefixer')
const gulpBabel = require('gulp-babel')
const del = require('del')
const webserver = require('gulp-webserver')
/**压缩index.html */
task('handleHtml', function () {
    return src('src/*.html')
        .pipe(gulpHtmlmin())
        .pipe(dest('dist'))
})
task('pages', function () {
    return src('src/pages/**/*')
        .pipe(gulpHtmlmin({
            collapseWhitespace: true, //移除空格
            removeAttributeQuotes: true, //移除属性双引号
            removeEmptyAttributes: true, // 移除空属性
            collapseBooleanAttributes: true,//移除类似checked boolean值属性,
            minifyJS: true,
            minifyCSS: true,
            removeStyleLinkTypeAttributes: true,
            removeScriptTypeAttributes: true
        }))
        .pipe(dest('dist/pages'))
})
/**压缩less */
task('minLess', function () {
    return src('src/assets/styles/*.less')
        .pipe(gulpLess()) //转码
        .pipe(prefixer()) //加前缀
        .pipe(gulpCssmin()) //压缩
        .pipe(dest('dist/assets/styles'))

});
/**压缩css */
task('mincss', function () {
    return src('src/assets/styles/*.css')
        .pipe(prefixer()) //加前缀
        .pipe(gulpCssmin()) //   .pipe(concat('main.min.css'))
        .pipe(dest('dist/assets/styles'))

})
/**压缩js */
task('minjs', function () {
    return src('src/utils/*.js')
        .pipe(gulpBabel({
            presets: ['es2015']
        })) //转码
        .pipe(gulpUglify()) //压缩
        .pipe(dest('dist/utils'))

})
/**压缩image*/
task('minImage', function () {
    return src('src/assets/images/*') //所有图片
        .pipe(gulpImagem({ progressive: true }))
        .pipe(dest('dist/assets/images'))

})
/**lib */
task('copylib', function () {
    return src('src/lib/**')
        .pipe(dest('dist/lib'))

})

/**监听文件变化 */
task('watchFileChange', async () => {
    console.log('---**监听文件是否变化**---')
    watch('src/*.html', task('concatHtml'))
    watch('src/assets/styles/*.less', task('minLess'))
    // watch('src/assets/styles/*.css', task('mincss'))
    watch('src/utils/*.js', task('minjs'))
    watch('src/assets/images/*', task('minImage'))
})

/**清空dist文件夹 */
task('clean', function () {
    return src(['dist/*'])
        .pipe(clean());
});

/**压缩 */
task('zip', function () {
    return src('dist').pipe()
})

/**启动服务器 */
task('connect', function () {
    src('./dist')
        .pipe(webserver({
            host: 'localhost',
            port: '8080',
            livereload: true, //实时刷新 (热加载)
            directoryListing: { //访问的路径是否显示
                enable: false,
            },
            open: './index.html', //默认打开页面
            proxies: [
                {
                    'source': 'hyl',
                    'target': 'www.salientsurveys.com',
                    'options': {}
                }
            ]
        }));
});

/**创建删除dist文件夹的任务 */
task('deleteHandler', async function () {
    await del(['dist/'])
});



//执行所有任务
exports.default = series(
    'deleteHandler', //删除dist
    parallel('handleHtml', 'copylib', 'minjs', 'minImage', 'minLess', 'pages'),
    'connect', 'watchFileChange'
)