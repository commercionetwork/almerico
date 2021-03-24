#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin "$DOCKER_REGISTRY"
docker tag $DOCKER_IMAGE_MAINNET_SCW $DOCKER_IMAGE_SCW:latest
docker push $DOCKER_IMAGE_MAINNET_SCW
docker push $DOCKER_IMAGE_SCW:latest