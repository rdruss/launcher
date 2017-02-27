#!/usr/bin/bash


REGISTRY_URI="registry.devshift.net"
REGISTRY_NS="obsidian"
REGISTRY_IMAGE="obsidian-frontend:latest"
REGISTRY_URL=${REGISTRY_URI}/${REGISTRY_NS}/${REGISTRY_IMAGE}
BUILDER_IMAGE="obsidian-frontend-builder"
BUILDER_CONT="obsidian-frontend-builder-container"
DEPLOY_IMAGE="obsidian-frontend-deploy"

TARGET_DIR="dist"

# Show command before executing
set -x

# Exit on error
set -e

if [ -z $CICO_LOCAL ]; then
    # We need to disable selinux for now, XXX
    /usr/sbin/setenforce 0

    # Get all the deps in
    yum -y install docker make git

    # Get all the deps in
    yum -y install docker make git
    service docker start
fi

#CLEAN
docker ps | grep -q ${BUILDER_CONT} && docker stop ${BUILDER_CONT}
docker ps -a | grep -q ${BUILDER_CONT} && docker rm ${BUILDER_CONT}
rm -rf ${TARGET_DIR}/

#BUILD
docker build -t ${BUILDER_IMAGE} -f Dockerfile.build .

mkdir ${TARGET_DIR}/
docker run --detach=true --name ${BUILDER_CONT} -t -v $(pwd)/${TARGET_DIR}:/${TARGET_DIR}:Z ${BUILDER_IMAGE} /bin/tail -f /dev/null #FIXME

docker exec ${BUILDER_CONT} npm install
docker exec ${BUILDER_CONT} npm run build:prod
docker exec -u root ${BUILDER_CONT} cp -r ${TARGET_DIR}/ /

#BUILD DEPLOY IMAGE
docker build -t ${DEPLOY_IMAGE} -f Dockerfile.deploy .

#PUSH
if [ -z $CICO_LOCAL ]; then
    docker tag ${DEPLOY_IMAGE} ${REGISTRY_URL}
    docker push ${REGISTRY_URL}
fi
