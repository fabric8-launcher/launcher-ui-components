Fabric8-Launcher Frontend
=========================

[![Build Status](https://ci.centos.org/view/Devtools/job/devtools-launcher-frontend-generator-build-master/badge/icon)](https://ci.centos.org/view/Devtools/job/devtools-launcher-frontend-generator-build-master/)
[![License](https://img.shields.io/:license-Apache2-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)

If this is the first time you are starting the UI, you need to run

```bash
$ npm install
```

If you trying to refresh your install you can run:

```bash
$ npm run reinstall
```

Start the app by executing the following.

```bash
$ npm start
```

The frontend will use your localhost backend as default. 

If you want the UI to use another version of the backend, you need to set the following environment variables:

```bash   
$ export LAUNCHER_BACKEND_URL=http://localhost:8080/api/
```

More details on running a local version of the backend are available [here][1].

## Production Build

If `LAUNCHER_BACKEND_URL` environment variables is not set, the frontend location will be used to target the backend.

Run the `npm` command as given below:

```bash
npm run build:prod
```

The build output will be under `dist` directory.

[1]: https://github.com/fabric8-launcher/launcher-backend