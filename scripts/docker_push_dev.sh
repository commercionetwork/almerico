#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin "$DOCKER_REGISTRY"
echo $(docker images)
docker tag $DOCKER_IMAGE_ALMERICO_TESTNET $DOCKER_IMAGE_ALMERICO_TESTNET
docker push $DOCKER_IMAGE_ALMERICO_TESTNET