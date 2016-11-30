Obsidian Generator UI
=====================

If this is the first time you are starting the UI you need to run

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

## OpenShift Image Build

```
oc delete dc/generator-frontend
oc delete bc/generator-frontend
oc delete service/generator-frontend
oc delete imagestream/centos7-s2i-nodejs
oc delete imagestream/generator-frontend
oc new-app ryanj/centos7-s2i-nodejs:5.12.0~https://github.com/obsidian-toaster/generator-frontend.git
```

## Production Build

To generate production build, set the API URL and run `npm` command as give below:

```bash
export FORGE_URL="http://api.example.org/api/"
npm run build:prod
```

The build output will be under `dist` directory.
