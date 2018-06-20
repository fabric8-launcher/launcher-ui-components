

module.exports = function (config) {
  const webpackConfig = require('./webpack.test');
  const configuration = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      { pattern: './config/karma-test-shim.js', watched: false },
      { pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false }
    ],

    proxies: {
      "/assets/": "/base/src/assets/"
    },

    preprocessors: {
      './config/karma-test-shim.js': ['coverage', 'webpack', 'sourcemap']
    },
    webpack: webpackConfig,

    coverageReporter: {
      type: 'in-memory'
    },
    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },
    webpackMiddleware: {
      logLevel: 'warn',
      stats: {
        chunks: false
      }
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ['mocha', 'coverage', 'remap-coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS_custom'],
    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'alm-window',
          settings: {
            webSecurityEnabled: false
          },
        },
        flags: ['--load-images=true'],
        debug: false
      }
    },
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered
      // (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },
    singleRun: true
  };

  if (process.env.TRAVIS){
    configuration.browsers = ['ChromeTravisCi'];
    configuration.customLaunchers = {
      'ChromeTravisCi': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  }

  config.set(configuration);
};
