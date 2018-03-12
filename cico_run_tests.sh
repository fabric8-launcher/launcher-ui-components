#!/bin/bash

# Exit on error
set -e

BUILDER_IMAGE="launcher-frontend-builder"
BUILDER_CONT="launcher-frontend-builder-container"
DEPLOY_IMAGE="launcher-frontend-deploy"
TARGET_DIR="dist"

if [ -z $CICO_LOCAL ]; then
    [ -f jenkins-env ] && cat jenkins-env | grep -e PASS -e USER -e GIT -e DEVSHIFT > inherit-env
    [ -f inherit-env ] && . inherit-env

    # We need to disable selinux for now, XXX
    /usr/sbin/setenforce 0

    # Get all the deps in
    yum -y install docker make git

    # Get all the deps in
    yum -y install docker make git
    service docker start
fi

#BUILD
docker build -t ${BUILDER_IMAGE} -f Dockerfile.build .

mkdir ${TARGET_DIR}/
docker run --detach=true --name ${BUILDER_CONT} -t -v $(pwd)/${TARGET_DIR}:/${TARGET_DIR}:Z ${BUILDER_IMAGE} /bin/tail -f /dev/null #FIXME

docker exec ${BUILDER_CONT} npm install
docker exec ${BUILDER_CONT} npm test

if [ $? -ne 0 ]; then
  echo 'CICO: unit tests FAIL'
  exit 1
fi

