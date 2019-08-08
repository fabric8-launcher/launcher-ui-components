const baseConfig = require('./jest.config.base');

baseConfig.roots = [
  './packages/launcher-component/src',
]

module.exports = baseConfig;
