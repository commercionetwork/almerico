#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin "$DOCKER_REGISTRY"
docker tag $DOCKER_IMAGE_MAINNET $DOCKER_IMAGE_V2_2_21
docker push $DOCKER_IMAGE_V2_2_21
