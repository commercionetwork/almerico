#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin "$DOCKER_REGISTRY"
# docker tag $DOCKER_IMAGE_DEVNET $DOCKER_IMAGE_DEVNET
docker tag $DOCKER_IMAGE_TESTNET $DOCKER_IMAGE_TESTNET
# docker push $DOCKER_IMAGE_DEVNET
docker push $DOCKER_IMAGE_TESTNET
