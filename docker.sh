#!/bin/bash

## create a docker network for our app if it doesn't exist
#if ! docker network ls | grep -q launchernw; then docker network create launchernw; fi

# remove any pre-existing image
docker rm -f frontend 2>&1 >/dev/null

# build the image
echo "Building image..."
docker build -q -t fabric8/launcher-frontend -f Dockerfile.deploy .

# run it
echo "Running image..."
docker run \
    --name frontend \
    -t \
    -p8088:8080 \
    -eLAUNCHPAD_KEYCLOAK_URL=$LAUNCHPAD_KEYCLOAK_URL \
    -eLAUNCHPAD_KEYCLOAK_REALM=$LAUNCHPAD_KEYCLOAK_REALM \
    -eLAUNCHPAD_BACKEND_URL=$LAUNCHPAD_BACKEND_URL \
    -eLAUNCHPAD_MISSIONCONTROL_URL=$LAUNCHPAD_MISSIONCONTROL_URL \
    -eLAUNCHPAD_TRACKER_SEGMENT_TOKEN=$LAUNCHPAD_TRACKER_SEGMENT_TOKEN \
    $1 \
    fabric8/launcher-frontend


