#!/bin/bash

DO_BUILD=1
DO_RUN=1

# this is for when we run without the "--net" option.
# Nginx doens't like it when it can't reach the launcher-backend
# and will fail to start. So we add a hosts entry of our own
# pointing to the docker host
DOCKER_HOST=$(ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+')
EXTRA_OPTS="--add-host launcher-backend:$DOCKER_HOST"

# see if a "--net" option was passed, if so we'll connect the
# container to a private network (creating it if necessary)
NETWORK=default
DRUN_OPTS=""
while [[ $# -gt 0 ]]; do
    case "$1" in
        --net)  NETWORK=launchernw
                # create a docker network for our app if it doesn't exist
                if ! docker network ls | grep -q $NETWORK; then docker network create $NETWORK; fi
                # override the connection URLs for the application
                LAUNCHER_BACKEND_URL=http://localhost:8088/launch/api
                EXTRA_OPTS=""
                ;;
        --build) DO_RUN=0
                ;;
        --run) DO_BUILD=0
                ;;
        --help) echo "Usage: docker.sh [options]"
                echo ""
                echo "Builds and runs this project's Docker image"
                echo ""
                echo "Options:"
                echo "   --build  : Only build the Docker image"
                echo "   --run    : Only run the Docker image"
                echo "   --net    : When run the Docker image will be attached to a private network"
                echo "   --help   : This help"
                echo ""
                echo "For all other available options see 'docker run --help'"
                exit
                ;;
        *)  DRUN_OPTS="$DRUN_OPTS $1"
                ;;
    esac
    shift
done

if [[ $DO_BUILD -eq 1 ]]; then
	# build the image
	echo "Building image..."
	docker build -t fabric8/launcher-frontend -f Dockerfile.deploy .
fi

if [[ $DO_RUN -eq 1 ]]; then
    # remove any pre-existing image
    docker rm -f launcher-frontend >/dev/null 2>&1

    if [[ -z "${LAUNCHER_MISSIONCONTROL_URL}" ]]; then
        echo "Missing environment variables, running with default values..."
        # Authentication: No KeyCloak
        unset LAUNCHER_KEYCLOAK_URL
        unset LAUNCHER_KEYCLOAK_REALM
        unset LAUNCHER_MISSIONCONTROL_OPENSHIFT_CLUSTERS_FILE
        unset LAUNCHER_MISSIONCONTROL_OPENSHIFT_TOKEN
        export LAUNCHER_MISSIONCONTROL_OPENSHIFT_USERNAME=developer
        export LAUNCHER_MISSIONCONTROL_OPENSHIFT_PASSWORD=developer
        # For launcher-frontend
        if [[ "$NETWORK" -eq "default" ]]; then
            export LAUNCHER_BACKEND_URL="http://127.0.0.1:8080/api"
        fi
    fi
    
	# run it
	echo "Running image..."
	docker run \
		--name launcher-frontend \
		--network $NETWORK \
		-t \
		-p8088:8080 \
		-eLAUNCHER_KEYCLOAK_URL=$LAUNCHER_KEYCLOAK_URL \
		-eLAUNCHER_KEYCLOAK_REALM=$LAUNCHER_KEYCLOAK_REALM \
		-eLAUNCHER_BACKEND_URL=$LAUNCHER_BACKEND_URL \
		-eLAUNCHER_TRACKER_SEGMENT_TOKEN=$LAUNCHER_TRACKER_SEGMENT_TOKEN \
		$DRUN_OPTS \
		$EXTRA_OPTS \
		fabric8/launcher-frontend
fi

