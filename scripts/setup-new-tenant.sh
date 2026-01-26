#!/bin/bash
# scripts/setup-new-tenant.sh

SUBDOMAIN=$1
DB_NAME=$2
DB_USER=$3
DB_PASSWORD=$4
DB_HOST=${5:-localhost}
DB_PORT=${6:-5432}

if [ -z "$SUBDOMAIN" ] || [ -z "$DB_NAME" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ]; then
  echo "❌ Uso: ./setup-new-tenant.sh <subdomain> <db_name> <db_user> <db_password> [db_host] [db_port]"
  exit 1
fi

echo "🚀 Creando tenant: $SUBDOMAIN"

# 1. Verificar que la base de datos ya existe
echo "✅ Asumiendo que BD ya está creada: $DB_NAME"

# 2. Ejecutar migraciones en la BD del tenant
echo "📦 Ejecutando migraciones en BD del tenant..."
export TYPEORM_HOST=$DB_HOST
export TYPEORM_PORT=$DB_PORT
export TYPEORM_DATABASE=$DB_NAME
export TYPEORM_USERNAME=$DB_USER
export TYPEORM_PASSWORD=$DB_PASSWORD

npm run migration:run:tenant

if [ $? -ne 0 ]; then
  echo "❌ Error al ejecutar migraciones"
  exit 1
fi

# 3. Obtener última migración ejecutada
LAST_MIGRATION=$(psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c \
  "SELECT name FROM typeorm_migrations ORDER BY timestamp DESC LIMIT 1;" | xargs)

echo "📝 Última migración: $LAST_MIGRATION"

# 4. Registrar tenant en BD Master
echo "📝 Registrando tenant en BD Master..."
psql -h $MASTER_DB_HOST -p $MASTER_DB_PORT -U $MASTER_DB_USER -d $MASTER_DB_NAME <<EOF
INSERT INTO tenants (subdomain, company_name, db_host, db_port, db_name, db_user, db_password, status, last_migration_version)
VALUES ('$SUBDOMAIN', '$SUBDOMAIN Inc.', '$DB_HOST', $DB_PORT, '$DB_NAME', '$DB_USER', '$DB_PASSWORD', 'active', '$LAST_MIGRATION');
EOF

if [ $? -ne 0 ]; then
  echo "❌ Error al registrar tenant en BD Master"
  exit 1
fi

echo "✅ Tenant $SUBDOMAIN creado exitosamente"
echo "🔗 Acceso: $SUBDOMAIN.tudominio.com"
