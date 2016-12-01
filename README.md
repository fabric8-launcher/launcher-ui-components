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

To generate production build, set the API URL (the host and port of where
[generator backend](https://github.com/obsidian-toaster/generator-backend) is deployed)
and run `npm` command as give below:

```bash
export FORGE_URL="http://<host:port>/forge"
npm run build:prod
```

The build output will be under `dist` directory.

To deploy this project on OpenShift, verify that an OpenShift instance is available or setup one locally
using minishift

```
minishift delete
minishift start --deploy-router=true --openshift-version=v1.3.1
oc login --username=admin --password=admin
eval $(minishift docker-env)
```

To create our Obsidian Front UI OpenShift application, execute this command
which will delegate the responsability to OpenShift to generate the Docker image
and next create a container as a pod

```
oc new-app . --strategy=docker --name=front-generator
```

To access the HTTP Server from the host machine, setup a route

```
oc expose svc/front-generator
```

Access it

```
curl http://$(oc get routes | grep front-generator | awk '{print $2}')/index.html
```
