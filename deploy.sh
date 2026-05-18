#!/bin/bash

IMAGE_NAME=api-backoffice
SERVER=back
REMOTE_PATH=/home/ubuntu/infra/api-backoffice
SSH_OPTS="-o ControlMaster=auto -o ControlPersist=10m -o ControlPath=~/.ssh/cm-%r@%h:%p"

echo "Compilando NestJS..."
npm run build

echo "Build Docker..."
docker build -t $IMAGE_NAME .

echo "Crear TAR..."
docker save -o $IMAGE_NAME.tar $IMAGE_NAME

echo "Crear carpeta en servidor..."
ssh $SSH_OPTS $SERVER "mkdir -p $REMOTE_PATH"

echo "Subir al servidor..."
scp $SSH_OPTS $IMAGE_NAME.tar $SERVER:$REMOTE_PATH/

echo "Ejecutando en servidor..."

ssh $SSH_OPTS $SERVER << EOF
cd $REMOTE_PATH

echo "Deteniendo contenedor anterior..."
docker compose down || true

echo "Eliminando imagen anterior..."
docker rmi $IMAGE_NAME:latest || true

echo "Cargando nueva imagen..."
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

echo "Levantando API..."
docker compose up -d

echo "Limpiando imágenes dangling..."
docker image prune -af || true

echo "Limpiando cache builder..."
docker builder prune -af || true

echo "Limpiando TAR..."
rm -f $IMAGE_NAME.tar
EOF

echo "Limpiando TAR local..."
rm -f $IMAGE_NAME.tar

echo "DEPLOY COMPLETADO"