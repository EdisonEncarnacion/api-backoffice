#!/bin/bash
# scripts/migrate-all-tenants.sh

echo "🔄 Iniciando migración de todos los tenants..."

# Obtener lista de tenants desde BD Master
TENANTS=$(psql -h $MASTER_DB_HOST -p $MASTER_DB_PORT -U $MASTER_DB_USER -d $MASTER_DB_NAME -t -c \
  "SELECT subdomain, db_host, db_port, db_name, db_user, db_password, id FROM tenants WHERE status = 'active';")

if [ -z "$TENANTS" ]; then
  echo "⚠️  No se encontraron tenants activos"
  exit 0
fi

SUCCESS_COUNT=0
ERROR_COUNT=0

while IFS='|' read -r subdomain db_host db_port db_name db_user db_password tenant_id; do
  # Limpiar espacios
  subdomain=$(echo $subdomain | xargs)
  db_host=$(echo $db_host | xargs)
  db_port=$(echo $db_port | xargs)
  db_name=$(echo $db_name | xargs)
  db_user=$(echo $db_user | xargs)
  db_password=$(echo $db_password | xargs)
  tenant_id=$(echo $tenant_id | xargs)
  
  echo "\n📦 Migrando tenant: $subdomain"
  
  # Exportar variables de entorno para este tenant
  export TYPEORM_HOST=$db_host
  export TYPEORM_PORT=$db_port
  export TYPEORM_DATABASE=$db_name
  export TYPEORM_USERNAME=$db_user
  export TYPEORM_PASSWORD=$db_password
  
  # Ejecutar migraciones usando TypeORM CLI
  if npm run migration:run:tenant; then
    # Obtener última migración ejecutada
    LAST_MIGRATION=$(psql -h $db_host -p $db_port -U $db_user -d $db_name -t -c \
      "SELECT name FROM typeorm_migrations ORDER BY timestamp DESC LIMIT 1;" | xargs)
    
    # Actualizar en BD Master
    psql -h $MASTER_DB_HOST -p $MASTER_DB_PORT -U $MASTER_DB_USER -d $MASTER_DB_NAME -c \
      "UPDATE tenants SET last_migration_version = '$LAST_MIGRATION', updated_at = NOW() WHERE id = '$tenant_id';"
    
    echo "✅ $subdomain migrado exitosamente (última: $LAST_MIGRATION)"
    ((SUCCESS_COUNT++))
  else
    echo "❌ Error en $subdomain"
    ((ERROR_COUNT++))
  fi
done <<< "$TENANTS"

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Migración completa"
echo "📊 Exitosos: $SUCCESS_COUNT"
echo "❌ Errores: $ERROR_COUNT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
