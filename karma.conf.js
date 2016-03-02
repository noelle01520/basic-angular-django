// Karma configuration
// Generated on Tue Feb 16 2016 05:21:56 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'angular/static/bower_components/angular/angular.js',
      'angular/static/bower_components/angular-mocks/angular-mocks.js',
      'angular/static/bower_components/angular-cookies/angular-cookies.js',
      'angular/static/bower_components/angular-route/angular-route.js',
      'angular/static/angular/js/*.js',
      'angular/static/angular/js/**/*.js',
      'angular/static/templates/**/*.html'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'angular/static/templates/**/*.html': ['ng-html2js'],
      'angular/static/angular/js/**/!(*.mock|*.spec).js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'angular',
      // create a single module that contains templates from all the files
      moduleName: 'templates'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'html',
      // output coverage reports
      dir : 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
