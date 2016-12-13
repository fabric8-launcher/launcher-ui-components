#!/usr/bin/env bash

# Using Template
# 1) Create a minishift instance
# minishift delete
# minishift start --deploy-router=true --openshift-version=v1.3.1
# oc login --username=admin --password=admin
# eval $(minishift docker-env)

# 2) Clean previously deployed objects
oc delete is/node
oc delete is/front-generator
oc delete bc/front-generator
oc delete dc/front-generator
oc delete svc/front-generator
oc delete route/front-generator
oc delete template/front-generator-s2i

# 3) Deploy the template & start the Build
oc delete project/front
oc new-project front
oc create -f templates/template_s2i.yml
oc process front-generator-s2i | oc create -f -
oc start-build front-generator
oc logs -f front-generator-1-build