(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        'rxjs': 'lib/rxjs',
        '@angular': 'lib/@angular',
        'ng2-translate': 'lib/ng2-translate',
        'angular2-highcharts': 'https://cdn.rawgit.com/gevgeny/angular2-highcharts/0.1.0/dist', 
        'highcharts/highstock.src':   'https://cdn.rawgit.com/highcharts/highcharts-dist/v4.2.1/highstock.js',
        'highcharts/highcharts-3d':   'https://cdn.rawgit.com/highcharts/highcharts-dist/v4.2.1/highcharts-3d.src.js'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {main: 'main.js', defaultExtension: 'js'},
        'rxjs': {defaultExtension: 'js'},
        'ng2-translate': {defaultExtension: 'js'},
        'angular2-highcharts' : { main: 'index',format: 'cjs', defaultExtension: 'js' }
   };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = {main: 'index.js', defaultExtension: 'js'};
    });

    var config = {
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);
