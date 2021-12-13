
const gulpLess = require('gulp-less')
const { parallel, series, src, dest, task, watch } = require('gulp')
const gulpUglify = require('gulp-uglify') //压缩js文件
const gulpCssmin = require('gulp-minify-css') //css压缩
const gulpImagem = require('gulp-imagemin')//图片压缩
const gulpHtmlmin = require('gulp-htmlmin') //压缩html文件
const prefixer = require('gulp-autoprefixer')
const gulpBabel = require('gulp-babel')
const del = require('del')
const webserver = require('gulp-webserver')
/**压缩index.html */
function handleHtml() {
    return src('src/*.html')
        .pipe(gulpHtmlmin())
        .pipe(dest('dist'))
}

function handlePages() {
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
}

/**压缩less */
function lessHandle() {
    return src('src/assets/styles/*.less')
        .pipe(gulpLess()) //转码
        .pipe(prefixer()) //加前缀
        .pipe(gulpCssmin()) //压缩
        .pipe(dest('dist/assets/styles'))
}

/**压缩js */
function jsHandle() {
    return src('src/utils/*.js')
        .pipe(gulpBabel()) //转码
        .pipe(gulpUglify()) //压缩
        .pipe(dest('dist/utils'))
}

/**压缩image*/
function imageHandle() {
    return src('src/assets/images/*') //所有图片
        .pipe(gulpImagem({ progressive: true }))
        .pipe(dest('dist/assets/images'))
}

/**lib */
function copyLib() {
    return src('src/lib/**')
        .pipe(dest('dist/lib'))
}


/**监听文件变化 */
function watchFileChange() {
    console.log("---**监听文件是否变化**---");
    watch("src/*.html", handleHtml);
    watch("src/assets/styles/*.less", lessHandle);
    watch("src/utils/*.js", jsHandle);
    watch("src/assets/images/*", imageHandle);
}

/**启动服务器 */
function connect() {
    src('./dist') //启动dist
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
}

/**创建删除dist文件夹的任务 */
async function deleteHandler() {
    await del(['dist/'])
}
/**导出任务 */
module.exports = handleHtml
module.exports = handlePages
module.exports = deleteHandler
module.exports = lessHandle
module.exports = jsHandle
module.exports = copyLib
module.exports = imageHandle
module.exports = watchFileChange
//执行所有任务
module.exports.default = series(
    deleteHandler,
    parallel(handleHtml, copyLib, jsHandle, imageHandle, lessHandle, handlePages),
    connect,
    watchFileChange
)