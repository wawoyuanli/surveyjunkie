const gulpLess = require("gulp-less");
const { parallel, series, src, dest, task, watch } = require("gulp");
const gulpUglify = require("gulp-uglify"); //压缩js文件
const gulpCssmin = require("gulp-minify-css"); //css压缩
const gulpHtmlmin = require("gulp-htmlmin"); //压缩html文件
const prefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const del = require("del");
const webserver = require("gulp-webserver");
const fileInclude = require("gulp-file-include");
/**压缩index.html */
function handleHtml() {
  return src("src/*.html")
    .pipe(
      fileInclude({
        prefix: "@-@", //自定义的标识符
        basepath: "src/components",
      })
    )
    .pipe(gulpHtmlmin())
    .pipe(dest("dist"));
}
const handleComponent = () => {
  return src("src/components/*.html").pipe(dest("dist/components"));
};
function handlePages() {
  return src("src/pages/**/*")
    .pipe(
      fileInclude({
        prefix: "@-@", //自定义的标识符
        basepath: "src/components",
      })
    )
    .pipe(
      gulpHtmlmin({
        collapseWhitespace: true, //移除空格
        removeEmptyAttributes: true, // 移除空属性
        // removeAttributeQuotes: true, //移除属性双引号
        // collapseBooleanAttributes: true, //移除类似checked boolean值属性,
        // minifyCSS: true,
        // removeStyleLinkTypeAttributes: true,
        // removeScriptTypeAttributes: true,
      })
    )
    .pipe(dest("dist/pages"));
}

/**压缩less */
function lessHandle() {
  return src("src/assets/styles/*.less")
    .pipe(gulpLess()) //转码
    .pipe(prefixer()) //加前缀
    .pipe(gulpCssmin()) //压缩
    .pipe(dest("dist/assets/styles"));
}

/**压缩js */
function jsHandle() {
  return src("src/utils/*.js")
    .pipe(babel({ presets: ["@babel/env"] })) //转码
    .pipe(gulpUglify()) //压缩
    .pipe(dest("dist/utils"));
}

/**压缩image*/
function imageHandle() {
  return (
    src("src/assets/images/*") //所有图片
      // .pipe(gulpImagem({ progressive: true }))
      .pipe(dest("dist/assets/images"))
  );
}
/**lib */
function copyLib() {
  return src("src/lib/**").pipe(dest("dist/lib"));
}
/**监听文件变化 */
async function watchFileChange() {
  console.log("---**监听文件是否变化**---");
  await watch("src/*.html", handleHtml);
  await watch("src/pages/**/*", handlePages);
  await watch("src/assets/styles/*.less", lessHandle);
  await watch("src/utils/*.js", jsHandle);
  await watch("src/assets/images/*", imageHandle);
  await watch("src/components/*.html", handleComponent);
}

/**启动服务器 */
function connect() {
  src("./dist") //启动dist
    .pipe(
      webserver({
        host: "localhost",
        port: "8085",
        livereload: true, //实时刷新 (热加载)
        directoryListing: {
          //访问的路径是否显示
          enable: false,
        },
        https: true,
        open: "./index.html", //默认打开页面
        proxies: [
          {
            source: "/manager",
            target: "https://onlinemoneyworld.com/manager", //代理目标地址
          },
        ],
      })
    );
}
const lang = () => {
  return src('src/utils/lang/*')
    .pipe(dest('dist/utils/lang'))
}

/**创建删除dist文件夹的任务 */
async function deleteHandler() {
  await del(["dist/"]);
}
/**导出任务 */
module.exports.handleHtml = handleHtml;
module.exports.handlePages = handlePages;
module.exports.deleteHandler = deleteHandler;
module.exports.lessHandle = lessHandle;
module.exports.jsHandle = jsHandle;
module.exports.copyLib = copyLib;
module.exports.imageHandle = imageHandle;
module.exports.watchFileChange = watchFileChange;
module.exports.lang=lang
//执行所有任务
module.exports.default = series(
  deleteHandler,
  parallel(
    handleHtml,
    handleComponent,
    copyLib,
    jsHandle,
    imageHandle,
    lessHandle,
    handlePages,
    lang
  ),
  watchFileChange,
  connect,
);
