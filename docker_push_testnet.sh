#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin "$DOCKER_REGISTRY"
docker push $DOCKER_IMAGE_SCW
docker push $DOCKER_IMAGE_DEVNET_SCW