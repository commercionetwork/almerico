#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin "$DOCKER_REGISTRY"
docker tag $DOCKER_IMAGE_TESTNET_0_1_0_SCW $DOCKER_IMAGE_0_1_0_SCW:latest
docker push $DOCKER_IMAGE_TESTNET_0_1_0_SCW
#docker push $DOCKER_IMAGE_DEVNET_0_1_0_SCW
docker push $DOCKER_IMAGE_0_1_0_SCW:latest