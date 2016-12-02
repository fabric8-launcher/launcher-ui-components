#!/usr/bin/env bash

# Docker Strategy
oc delete imagestreams/front-generator
oc delete bc/front-generator
oc delete dc/front-generator
oc delete service/front-generator
oc delete route/front-generator

oc new-app https://github.com/obsidian-toaster/generator-frontend.git --name=front-generator --strategy=docker

oc env bc/front-generator FORGE_URL="http://generator-backend-default.192.168.64.73.xip.io/forge"
oc expose svc/front-generator

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