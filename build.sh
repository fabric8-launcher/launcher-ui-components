#!/usr/bin/env bash

oc delete imagestreams/front-generator
oc delete bc/front-generator
oc delete dc/front-generator
oc delete service/front-generator
oc delete route/front-generator

oc new-app https://github.com/obsidian-toaster/generator-frontend.git --env=FORGE_URL="http://generator-backend-default.192.168.64.71.xip.io/forge" --name=front-generator --strategy=docker
