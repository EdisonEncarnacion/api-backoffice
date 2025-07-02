#!/usr/bin/env bash
set -euo pipefail

CONTAINER_NAME="api-backoffice-sync"
IMAGE_NAME="backend-backoffice-sync"
ENV_FILE="${1:-../.env.test}"
NETWORK_NAME="backend-backoffice-test_mynetwork"

if docker ps -a --format '{{.Names}}' | grep -qx "$CONTAINER_NAME"; then
  docker rm -f "$CONTAINER_NAME"
fi

docker run -d \
  --name "$CONTAINER_NAME" \
  --env-file "$ENV_FILE" \
  -p 3017:3017 \
  --network "$NETWORK_NAME" \
  --restart unless-stopped \
  "$IMAGE_NAME"
