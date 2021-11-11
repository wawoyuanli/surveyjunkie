var gulp = require('gulp')
var less = require('gulp-less')
gulp.task('testLess', function () {
    gulp.src('../assets/styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'));

})
gulp.task('gulpWatch', function () {
    gulp.watch('../assets/styles/*.less', ['testLess'
    ]);
});

gulp.task('default', () => {
    gulp.start('gulpWatch');
})