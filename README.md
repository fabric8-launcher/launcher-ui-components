Fabric8-Launcher Frontend
=========================

[![Build Status](https://travis-ci.com/fabric8-launcher/launcher-frontend.svg?branch=master)](https://travis-ci.com/fabric8-launcher/launcher-frontend)
[![License](https://img.shields.io/:license-Apache2-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&identifier=72209295)](https://dependabot.com)

If this is the first time you are starting the UI, you need to run

```bash
$ yarn install
```

Start the app by executing the following.

```bash
$ export KEYCLOAK=OFFICIAL && export BACKEND=LOCAL && ./run.sh
```

The frontend will use your localhost backend and official keycloak. 

If you want the UI to use another version of the backend or keycloak, you need to change the following environment variables:`
- BACKEND: `LOCAL` or `PROD` or `PROD_PREVIEW`
- KEYCLOAK (only available when `BACKEND=LOCAL`): `OFFICIAL` or `NO` or `LOCAL`

More details on running a local version of the backend are available [here][1].

## Test

Run the `yarn` command as given below:

```bash
yarn test
```

## Production Build

If `LAUNCHER_BACKEND_URL` environment variables is not set, the frontend location will be used to target the backend.

Run the `yarn` command as given below:

```bash
yarn build:prod
```

The build output will be under `dist` directory.

[1]: https://github.com/fabric8-launcher/launcher-backend
