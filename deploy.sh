#!/bin/bash

IMAGE_NAME=api-backoffice
SERVER=back
REMOTE_PATH=/home/ubuntu/infra/api-backoffice

echo "Build..."
docker build -t $IMAGE_NAME .

echo "Crear TAR..."
docker save -o $IMAGE_NAME.tar $IMAGE_NAME

echo "Crear carpeta en servidor..."
ssh $SERVER "mkdir -p $REMOTE_PATH"

echo "Subir al servidor..."
scp $IMAGE_NAME.tar $SERVER:$REMOTE_PATH/

echo "Ejecutando en servidor..."

ssh $SERVER << EOF
cd $REMOTE_PATH

echo "Cargando imagen..."
docker load -i $IMAGE_NAME.tar

echo "Creando docker-compose..."
cat > docker-compose.yml << 'EOL'
services:
  api-backoffice:
    image: api-backoffice
    container_name: api-backoffice
    env_file:
      - .env.production
    environment:
      - PORT=3017
    networks:
      - backoffice-net
      - traefik
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=traefik"
      - "traefik.http.routers.backoffice-sync.rule=Host(\`sync.sportschool.pe\`)"
      - "traefik.http.routers.backoffice-sync.entrypoints=websecure"
      - "traefik.http.routers.backoffice-sync.tls.certresolver=cloudflare"
      - "traefik.http.services.backoffice-sync.loadbalancer.server.port=3017"

networks:
  backoffice-net:
    external: true
  traefik:
    external: true
EOL

echo "Deteniendo anterior..."
docker compose down || true

echo "Levantando API..."
docker compose up -d

echo "Limpiando TAR..."
rm -f $IMAGE_NAME.tar
EOF

echo "Limpiando local..."
rm -f $IMAGE_NAME.tar

echo "DEPLOY COMPLETADO"