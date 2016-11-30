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

## Production Build

To generate production build, set the API URL and run `npm` command as give below:

```bash
export FORGE_URL="http://api.example.org/api/"
npm run build:prod
```

The build output will be under `dist` directory.

To create the docker image, verify that a Docker daemon is available and next
run this command immediately after the previous command:

```
docker build -t obsidian/front-generator -f Docker.deploy .
docker tag obsidian/front-generator obsidian/front-generator:latest
```

To create an OpenShift application, execute this command:

```
oc delete service/generator-frontend
oc delete imagestreams/openshift-nginx
oc delete imagestreams/generator-frontend
oc delete dc/generator-frontend
oc delete bc/generator-frontend

oc new-app obsidian/front-generator:latest
oc deploy front-generator --latest -n default

oc new-app /Users/chmoulli/Code/jboss/obsidian-toaster/generator-frontend --strategy=docker

```
