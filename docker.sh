#!/bin/bash

# see if a "--net" option was passed, if so we'll connect the
# container to a private network (creating it if necessary)
NETWORK=default
DRUN_OPTS=""
for arg; do
    case $arg in
        --net)  NETWORK=launchernw
                # create a docker network for our app if it doesn't exist
                if ! docker network ls | grep -q $NETWORK; then docker network create $NETWORK; fi
                # override the connection URLs for the application
                LAUNCHPAD_BACKEND_URL=http://localhost:8088/launcher/api
                LAUNCHPAD_MISSIONCONTROL_URL=ws://localhost:8088/launcher
                ;;
        *)  DRUN_OPTS="$DRUN_OPTS ${arg}"
                ;;
    esac
done

# remove any pre-existing image
docker rm -f launcher-frontend >/dev/null 2>&1

# build the image
echo "Building image..."
docker build -q -t fabric8/launcher-frontend -f Dockerfile.deploy .

# run it
echo "Running image..."
docker run \
    --name launcher-frontend \
    --network $NETWORK \
    -t \
    -p8088:8080 \
    -eLAUNCHPAD_KEYCLOAK_URL=$LAUNCHPAD_KEYCLOAK_URL \
    -eLAUNCHPAD_KEYCLOAK_REALM=$LAUNCHPAD_KEYCLOAK_REALM \
    -eLAUNCHPAD_BACKEND_URL=$LAUNCHPAD_BACKEND_URL \
    -eLAUNCHPAD_MISSIONCONTROL_URL=$LAUNCHPAD_MISSIONCONTROL_URL \
    -eLAUNCHPAD_TRACKER_SEGMENT_TOKEN=$LAUNCHPAD_TRACKER_SEGMENT_TOKEN \
    $DRUN_OPTS \
    fabric8/launcher-frontend


