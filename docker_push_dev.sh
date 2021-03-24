#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin "$DOCKER_REGISTRY"
docker tag $DOCKER_IMAGE_DEVNET_SCW $DOCKER_IMAGE_SCW:dev
docker push $DOCKER_IMAGE_TESTNET_SCW
docker push $DOCKER_IMAGE_DEVNET_SCW
docker push $DOCKER_IMAGE_SCW:dev