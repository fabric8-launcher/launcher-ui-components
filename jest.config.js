const baseConfig = require('./jest.config.base');

baseConfig.roots = [
  './packages/launcher-client/src',
  './packages/launcher-component/src',
]

module.exports = baseConfig;
