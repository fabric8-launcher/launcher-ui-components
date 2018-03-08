#!/bin/bash

# Show command before executing
set -x

# Exit on error
set -e

# Export needed vars
set +x
for var in BUILD_NUMBER BUILD_URL JENKINS_URL GIT_BRANCH GH_TOKEN NPM_TOKEN GIT_COMMIT DEVSHIFT_USERNAME DEVSHIFT_PASSWORD DEVSHIFT_TAG_LEN; do
  export $(grep ${var} jenkins-env | xargs)
done
export BUILD_TIMESTAMP=`date -u +%Y-%m-%dT%H:%M:%S`+00:00
set -x

# We need to disable selinux for now, XXX
/usr/sbin/setenforce 0
echo "$(date) $line"
# Get all the deps in
yum -y install \
  docker \
  make \
  git
service docker start
echo "Docker Started: $(date) $line"

REGISTRY="push.registry.devshift.net"
PULLREGISTRY="registry.devshift.net"
TAG="1.0.0"

# Build builder image
if [ -n "${DEVSHIFT_USERNAME}" -a -n "${DEVSHIFT_PASSWORD}" ]; then
  docker login -u ${DEVSHIFT_USERNAME} -p ${DEVSHIFT_PASSWORD} ${REGISTRY}
else
  echo "Could not login, missing credentials for the registry"
fi

mkdir -p dist
docker run --detach=true --name=launcher-frontend-builder -t -v $(pwd)/dist:/dist:Z ${PULLREGISTRY}/fabric8/launcher-frontend-builder:${TAG}

ret=$?
if [ $ret -ne 0 ]; then
  docker build -t launcher-frontend-builder -f Dockerfile.build . && \
  docker tag launcher-frontend-builder ${REGISTRY}/fabric8/launcher-frontend-builder:${TAG} && \
  docker push ${REGISTRY}/fabric8/launcher-frontend-builder:${TAG}
  docker run --detach=true --name=launcher-frontend-builder -t -v $(pwd)/dist:/dist:Z ${PULLREGISTRY}/fabric8/launcher-frontend-builder:${TAG}
fi

echo "NPM Install starting: $(date) $line"

# Build
docker exec launcher-frontend-builder npm install
echo "NPM Install Complete: $(date) $line"
## Exec unit tests
docker exec launcher-frontend-builder npm test

if [ $? -ne 0 ]; then
  echo 'CICO: unit tests FAIL'
  exit 1
fi

docker exec launcher-frontend-builder npm run build:prod
echo "Build Complete: $(date) $line"

