

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
    browsers: ['ChromeHeadless'],
    singleRun: true
  };

  config.set(configuration);
};
