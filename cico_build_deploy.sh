#!/usr/bin/bash

set -x

GENERATOR_DOCKER_HUB_USERNAME=openshiftioadmin
REGISTRY_NS="fabric8"
REGISTRY_IMAGE="launcher-frontend"
DOCKER_HUB_URL=${REGISTRY_NS}/${REGISTRY_IMAGE}
BUILDER_IMAGE="launcher-frontend-builder"
BUILDER_CONT="launcher-frontend-builder-container"
DEPLOY_IMAGE="launcher-frontend-deploy"
DEVSHIFT_TAG_LEN=7
GIT_COMMIT=$(git show --format=%H -q)
TARGET_DIR="dist"
REGISTRY_URL=${REGISTRY_URI}/openshiftio/${REGISTRY_NS}-${REGISTRY_IMAGE}
DOCKERFILE="Dockerfile.deploy"

function docker_login() {
    local USERNAME=$1
    local PASSWORD=$2
    local REGISTRY=$3

    if [ -n "${USERNAME}" ] && [ -n "${PASSWORD}" ]; then
        docker login -u ${USERNAME} -p ${PASSWORD} ${REGISTRY}
    fi
}

function tag_push() {
    local TARGET_IMAGE=$1

    docker tag ${DEPLOY_IMAGE} ${TARGET_IMAGE}
    docker push ${TARGET_IMAGE}
}

# Exit on error
set -e

#CLEAN
docker ps | grep -q ${BUILDER_CONT} && docker stop ${BUILDER_CONT}
docker ps -a | grep -q ${BUILDER_CONT} && docker rm ${BUILDER_CONT}
rm -rf ${TARGET_DIR}/

#BUILD
docker build -t ${BUILDER_IMAGE} -f Dockerfile.build .

mkdir ${TARGET_DIR}/
docker run --detach=true --name ${BUILDER_CONT} -t -v $(pwd)/${TARGET_DIR}:/${TARGET_DIR}:Z ${BUILDER_IMAGE} /bin/tail -f /dev/null #FIXME

docker exec ${BUILDER_CONT} yarn install
docker exec ${BUILDER_CONT} yarn build:prod
docker exec -u root ${BUILDER_CONT} cp -r ${TARGET_DIR}/ /

#BUILD DEPLOY IMAGE
docker build -t ${DEPLOY_IMAGE} -f "${DOCKERFILE}" .

#PUSH
if [ -z $CICO_LOCAL ]; then
    TAG=$(echo $GIT_COMMIT | cut -c1-${DEVSHIFT_TAG_LEN})

  
    if [[ "$TARGET" != "rhel" && -n "${GENERATOR_DOCKER_HUB_PASSWORD}" ]]; then
        docker_login "${GENERATOR_DOCKER_HUB_USERNAME}" "${GENERATOR_DOCKER_HUB_PASSWORD}"
        tag_push "${DOCKER_HUB_URL}:${TAG}"
    fi
fi
