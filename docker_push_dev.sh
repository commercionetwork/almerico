#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin "$DOCKER_REGISTRY"
docker tag $DOCKER_IMAGE_SCW_DEVNET $DOCKER_IMAGE_SCW:dev
docker push $DOCKER_IMAGE_SCW_DEVNET
docker push $DOCKER_IMAGE_SCW_TESTNET
docker push $DOCKER_IMAGE_SCW:dev