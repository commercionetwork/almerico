echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin "$DOCKER_REGISTRY"
echo "Publishing release $DOCKER_IMAGE_ALMERICO_V_3_2 from $TRAVIS_BRANCH branch"
docker tag $DOCKER_IMAGE_ALMERICO_V_3_2 $DOCKER_IMAGE_ALMERICO_V_3_2
docker push $DOCKER_IMAGE_ALMERICO_V_3_2