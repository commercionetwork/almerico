echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin "$DOCKER_REGISTRY"
echo $(docker images)
docker tag $DOCKER_IMAGE_ALMERICO_DEVNET $DOCKER_IMAGE_ALMERICO_DEVNET
docker push $DOCKER_IMAGE_ALMERICO_DEVNET
docker tag $DOCKER_IMAGE_ALMERICO_TESTNET_V3 $DOCKER_IMAGE_ALMERICO_TESTNET_V3
docker push $DOCKER_IMAGE_ALMERICO_TESTNET_V3