// Karma configuration for working with serviceworker-jasmine

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    // This is must be the directory root so that node_modules is served from /base. If it isn't, this doesn't work
    basePath: '../',


    // frameworks to use
    frameworks: ['serviceworker-jasmine'],

    // You need to pass through the tests that you want to be run directly to the client, 
    // as well as specifying them in the files part of the config
    client: {
        'serviceworker-jasmine': {
            SW_TESTS: [
                'samples/serviceworker.test.js'
            ]
        }

    },

    // Allows service workers access to the full scope, so that they can capture fetch events if you should trigger some
    customHeaders: [{
        match: '.*.html',
        name: 'Service-Worker-Allowed',
        value: '/'
    }],

    // list of files / patterns to load in the browser
    files: [
      {pattern: 'lib/**/*.js', included: false}
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    browsers: ['Chrome', 'Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
