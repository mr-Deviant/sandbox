var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var paths = {
    pages: ['src/*.html']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true, // Causes tsify to emit source maps inside the bundled JavaScript file
        entries: ['src/typescript.ts'],
        cache: {},
        packageCache: {}
    }) // Bundle all our modules into one JavaScript file
    .plugin(tsify) // Browserify plugin for compiling Typescript
    .bundle()
    // `source` is alias `for vinyl-source-stream`,
    // lets us adapt the file output of Browserify back into a format that gulp understands called vinyl
    // and name output file
    .pipe(source('typescript.js'))
    .pipe(gulp.dest("dist"));
});