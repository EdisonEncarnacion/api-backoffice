#!/bin/bash

# Script para limpiar TypeOrmModule.forFeature de todos los módulos
# Mantiene solo providers y controllers

echo "🧹 Limpiando TypeOrmModule.forFeature de todos los módulos..."

# Lista de módulos a limpiar
modules=(
  "src/bank-account/bank-account.module.ts"
  "src/account/account.module.ts"
  "src/account-card-type/account-card-type.module.ts"
  "src/hose/hose.module.ts"
  "src/vehicle/vehicle.module.ts"
  "src/sale-details/sale-details.module.ts"
  "src/module/module.module.ts"
  "src/account-type/account-type.module.ts"
  "src/cash-register/cash-register.module.ts"
  "src/side/side.module.ts"
  "src/currency/currency.module.ts"
  "src/account-product/account-product.module.ts"
  "src/transaction-controller/transaction-controller.module.ts"
  "src/tank/tank.module.ts"
  "src/bank/bank.module.ts"
  "src/authorization-code/authorization-code.module.ts"
  "src/flow-meter/flow-meter.module.ts"
  "src/serie/serie.module.ts"
  "src/product/product.module.ts"
  "src/product-local/product-local.module.ts"
  "src/movement-type/movement-type.module.ts"
  "src/role-access/role-access.module.ts"
  "src/group-serie/group-serie.module.ts"
  "src/account-card-product/account-card-product.module.ts"
  "src/account-card/account-card.module.ts"
  "src/payments/payments.module.ts"
  "src/deposit/deposit.module.ts"
  "src/sales/sales.module.ts"
  "src/user/user.module.ts"
  "src/general-type/general-type.module.ts"
  "src/client/client.module.ts"
  "src/driver/driver.module.ts"
  "src/employee/employee.module.ts"
  "src/role/role.module.ts"
  "src/movement/movement.module.ts"
)

count=0
for module in "${modules[@]}"; do
  if [ -f "$module" ]; then
    # Backup
    cp "$module" "$module.backup"
    
    # Remover líneas con TypeOrmModule.forFeature
    sed -i '/TypeOrmModule\.forFeature/d' "$module"
    
    # Remover import de TypeOrmModule si existe
    sed -i '/import.*TypeOrmModule.*from.*@nestjs\/typeorm/d' "$module"
    
    # Limpiar imports vacíos
    sed -i '/^import.*{.*}.*from.*$/d' "$module"
    
    echo "✅ Limpiado: $module"
    ((count++))
  fi
done

echo ""
echo "✅ Total de módulos limpiados: $count"
echo "📝 Backups creados con extensión .backup"
