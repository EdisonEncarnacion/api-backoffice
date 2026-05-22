#!/bin/bash

IMAGE_NAME=api-backoffice
SERVER=backoffice
REMOTE_PATH=/home/backoffice/infra/api-backoffice

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

echo "Levantando API..."
docker compose up -d

rm -f $IMAGE_NAME.tar
EOF

echo "Limpiando TAR local..."
rm -f $IMAGE_NAME.tar

echo "DEPLOY COMPLETADO"