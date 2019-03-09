Fabric8-Launcher Frontend
=========================

[![CircleCI](https://circleci.com/gh/fabric8-launcher/launcher-frontend.svg?style=svg)](https://circleci.com/gh/fabric8-launcher/launcher-frontend)
[![License](https://img.shields.io/:license-Apache2-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&identifier=72209295)](https://dependabot.com)

If this is the first time you are starting the UI, you need to run

```bash
$ yarn install
```

## Development

### Start Storybook dev server (launcher-component)
```bash
$ yarn launcher-component:storybook
```

### Build all libraries
```bash
$ yarn build:libs
```

### Start Launcher Application dev server (against staging-api)
```bash
$ yarn launcher-app:start
```

### Publish storybook
```bash
$ yarn launcher-component:storybook:publish

## Test

```bash
$ yarn test
```

## Build for production

```bash
$ yarn build
```

### Storybook
https://fabric8-launcher.github.io/launcher-frontend/

## Patternfly Doc
http://patternfly-react.surge.sh/patternfly-4/
