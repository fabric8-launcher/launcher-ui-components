module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(scss)|(css)$": "identity-obj-proxy",
  },
  testMatch: [ "**/?(*.)+(spec).ts?(x)" ]
};
