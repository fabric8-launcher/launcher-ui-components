#!/usr/bin/env bash

# Using Template
# minishift delete
# minishift start --deploy-router=true --openshift-version=v1.3.1
# oc login --username=admin --password=admin
# eval $(minishift docker-env)

oc delete is/node
oc delete is/node-6
oc delete is/front-generator
oc delete bc/front-generator
oc delete dc/front-generator
oc delete service/front-generator
oc delete route/front-generator
oc delete template/front-generator
#oc create -f templates/template_docker.yml
oc create -f templates/template_s2i.yml
oc process front-generator FORGE_URL=http://generator-backend-default.192.168.64.75.xip.io/forge | oc create -f -
oc start-build front-generator

# Docker Strategy
# oc delete is/node
# oc delete is/front-generator
# oc delete bc/front-generator
# oc delete dc/front-generator
# oc delete service/front-generator
# oc delete route/front-generator
#
# oc new-app https://github.com/obsidian-toaster/generator-frontend.git --name=front-generator --strategy=docker
#
# oc env bc/front-generator FORGE_URL="http://generator-backend-default.192.168.64.73.xip.io/forge"
# oc expose svc/front-generator

# Source Strategy
# oc create -f https://raw.githubusercontent.com/obsidian-toaster/generator-frontend/npm-install/imagestream.yaml
# oc import-image nodejs-4
# oc delete imagestreams/front-generator-s2i
# oc delete bc/front-generator-s2i
# oc delete dc/front-generator-s2i
# oc delete service/front-generator-s2i
# oc delete route/front-generator-s2i
#
# oc new-app nodejs-4~https://github.com/obsidian-toaster/generator-frontend.git#npm-install --name=front-generator-s2i --strategy=source
#
# oc env bc/front-generator-s2i FORGE_URL="http://generator-backend-default.192.168.64.72.xip.io/forge"

# My S2I Strategy
# oc delete is/my-nodejs-4
# oc create -f new-imagestream.yaml
# oc import-image my-nodejs-4
# oc delete is/front-generator-my-s2i
# oc delete bc/front-generator-my-s2i
# oc delete dc/front-generator-my-s2i
# oc delete service/front-generator-my-s2i
# oc delete route/front-generator-my-s2i
# oc new-app my-nodejs-4~https://github.com/obsidian-toaster/generator-frontend.git#npm-install --name=front-generator-my-s2i --strategy=source