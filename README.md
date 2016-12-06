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

## OpenShift 

To deploy this project on OpenShift, verify that an OpenShift instance is available or setup one locally
using minishift

```
minishift delete
minishift start --deploy-router=true --openshift-version=v1.3.1
oc login --username=admin --password=admin
eval $(minishift docker-env)
```

To create our Obsidian Front UI OpenShift application, we will deploy an OpenShift template which
has been defined to created the required objects; service, route, BuildConfig with S2I source build & Deployment config

To install the template and create an ew application, use these commands where you will setup the DNS name of the Forge Backend

```
oc create -f templates/template_s2i_image.yml
oc process front-generator-s2i FORGE_URL=http://<FORGE-BACKEND-ROUTE-ADDRESS>/forge | oc create -f -
oc deploy front-generator --latest -n PROJECT_NAME
```

You can now access the backend using its route

```
curl http://$(oc get routes | grep front-generator | awk '{print $2}')/index.html
```

Remarks:

* For every new commit about this project `front-generator` that you want to test after the initial installation of the template, launching a new build
  on OpenShift is just required `oc start-build front-generator`

* If for any reasons, you would like to redeploy a new template, then you should first delete the template and the corresponding objects

```
oc delete is/node
oc delete is/front-generator
oc delete bc/front-generator
oc delete dc/front-generator
oc delete svc/front-generator
oc delete route/front-generator
oc delete template/front-generator
oc create -f templates/template_docker.yml
```

# S2i Scripts

The S2I scripts, packaged within this project allow to override the scripts used within the S2I Build Image. They have been created
as the build image will only execute the `npm install` during the assemby phase and `npm start` during the run phase.

As our process requires 2 installations instructions, the scripts have been customized

They can be tested locally using the [s2i tool](https://github.com/openshift/source-to-image) and this command

```
s2i build . ryanj/centos7-s2i-nodejs:current my-nodejs -c
```
