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
minishift delete
minishift start --deploy-registry=true --openshift-version=v1.3.1
oc login --username=admin --password=admin
eval $(minishift docker-env)
export DOCKER_IP=$(oc get services | grep docker-registry | awk '{print $2}')
docker login -u admin -p $(oc whoami -t) $DOCKER_IP:5000
docker build -t default/front-generator .
export IMAGE_ID=$(docker images | grep front-generator | awk '{print $3}')
docker tag $IMAGE_ID $DOCKER_IP:5000/default/front-generator
docker push $DOCKER_IP:5000/default/front-generator
```
|
To create an OpenShift application, execute this command:

```
oc delete imagestreams/openshift-nginx
oc delete imagestreams/front-generator
oc delete bc/front-generator
oc delete dc/front-generator
oc delete service/front-generator

oc new-app --docker-image=default/front-generator:latest --name=front-generator --insecure-registry=true
$DOCKER_IP:5000/default/
oc deploy front-generator --latest -n default

OR

oc new-app . --strategy=docker --name=front-generator
```
