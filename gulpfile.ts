"use strict";
const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const jsonMinify = require('gulp-json-minify');

const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

var proxy = require('proxy-middleware');
var url = require('url');

// Remove build directory.
gulp.task('clean', (cb) => {
    return del(["build"], cb);
});
gulp.task('clean:prod', (cb) => {
    return del(["dist"], cb);
});

// Lint all custom TypeScript files.
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

// Compile TypeScript sources and create sourcemaps in build directory.
gulp.task("compile", ["tslint"], () => {
    let tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build"));
});
gulp.task("compile:prod", ["tslint"], () => {
    let tsResult = gulp.src("src/**/*.ts")
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(uglify())
        .pipe(gulp.dest("dist"));
});

// Copy all resources that are not TypeScript files into build directory.
gulp.task("resources", () => {
    return gulp.src(["src/**/*", "!**/*.ts"])
        .pipe(gulp.dest("build"));
});
gulp.task("resources:prod", () => {
    let htmlResult = gulp.src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true, caseSensitive: true}))
        .pipe(gulp.dest('dist'))

    let jsonResult = gulp.src('src/**/*.json')
        .pipe(jsonMinify())
        .pipe(gulp.dest('dist'))

    return gulp.src(["src/**/*", "!**/*.ts", '!**/*.html'])
        .pipe(gulp.dest("dist"));
});

// Copy all required libraries into build directory.
gulp.task("libs", () => {
    return gulp.src([
            'es6-shim/es6-shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'ng2-translate/**',
            'angular2-highcharts/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});
gulp.task("libs:prod", () => {
    return gulp.src([
            'es6-shim/es6-shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'ng2-translate/**',
            'angular2-highcharts/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("dist/lib"));
});

// Watch for changes in TypeScript, HTML and CSS files.
gulp.task('watch', () => {
    gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

// Build the project
gulp.task("build", ['compile', 'resources', 'libs'], () => {
    console.log("Building the project ...");
});
gulp.task('build:prod',['clean:prod'], () => {
    runSequence(['compile:prod', 'resources:prod', 'libs:prod'], () => {
        console.log('Project ready for production on dist folder');
    });
});

// Start a local server
gulp.task('serve', () => {
    // Run build task and then watch task. When there is a change on src folder, watch task 
    // will compile the app again
    runSequence(['build', 'watch'], () => {
        // Proxy to localhost:8080
        var proxyOptions = url.parse('http://localhost:8080/api');
        proxyOptions.route = '/api';
        proxyOptions.preserveHost = true;

        browserSync({
            logPrefix: 'VASS Angular2 Test',
            port: 5000,
            browser: 'google chrome',
            server: {
                baseDir: './build',
                middleware: [function (req, res, next) {
                    // CORS Origin....
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        next();
                    }, proxy(proxyOptions)]
            }
        });

        // Watch for changes on build folder. A change on src folder will make watch task run.
        // This task will put the files on build folder.
        // So, we ahve to watch on build folder to reload the browser 
        gulp.watch([
            "/build/**/*.js",
            "/build/**/*.css",
            "/build/**/*.html"
        ], browserSync.reload);
    });
});
// Start a local server
gulp.task('serve:prod', ['build:prod'], () => {
    // Proxy to localhost:8080
    var proxyOptions = url.parse('http://localhost:8080/api');
    proxyOptions.route = '/api';
    proxyOptions.preserveHost = true;

    browserSync({
        logPrefix: 'VASS Angular2 Test',
        port: 5000,
        browser: 'google chrome',
        server: {
            baseDir: './dist',
            middleware: [function (req, res, next) {
                // CORS Origin....
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    next();
                }, proxy(proxyOptions)]
        }
    });

    // Watch for changes on build folder. A change on src folder will make watch task run.
    // This task will put the files on build folder.
    // So, we ahve to watch on build folder to reload the browser 
    gulp.watch([
        "/build/**/*.js",
        "/build/**/*.css",
        "/build/**/*.html"
    ], browserSync.reload);
});

