const gulp = require('gulp');
const { watch, series, src, dest } = require("gulp");
var browserSync = require("browser-sync").create();
var postcss = require("gulp-postcss");
var fileinclude = require("gulp-file-include");
const imagemin = require("gulp-imagemin");

// Task for compiling our CSS files using PostCSS
function cssTask(cb) {
    return src("./src/assets/css/*.css") // read .css files from ./src/ folder
        .pipe(postcss()) // compile using postcss
        .pipe(dest("./public/assets/css")) // paste them in ./assets/css folder
        .pipe(browserSync.stream());
    cb();
}

// Task for minifying images
function imageminTask(cb) {
    return src("./src/assets/images/*")
        .pipe(imagemin())
        .pipe(dest("./public/assets/images"));
    cb();
}

// Task for file includes
function fileincludeTask(cb) {
    return src(['./src/*.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
    cb();
}

// Task for fonts
function fontsTask(cb) {
    return src("./src/assets/fonts/*")
        .pipe(dest("./public/assets/fonts"));
    cb();
}

// Serve from browserSync server
function browsersyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: "./public/",
        },
    });
    cb();
}

function browsersyncReload(cb) {
    browserSync.reload();
    cb();
}

// Watch Files & Reload browser after tasks
function watchTask() {
    watch(["./src/assets/images/*"], series(imageminTask, browsersyncReload));
    watch(["./src/**/*.css"], series(cssTask, browsersyncReload));
    watch(["./src/**/*.html"], series(fileincludeTask, browsersyncReload));
}

// Default Gulp Task
exports.default = series(fileincludeTask, cssTask, fontsTask, imageminTask, browsersyncServe, watchTask);
exports.css = cssTask;
exports.images = imageminTask;
exports.build = series(fileincludeTask, cssTask, fontsTask, imageminTask);