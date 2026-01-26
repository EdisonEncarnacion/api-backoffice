#!/usr/bin/env python3
"""
Script para limpiar TypeOrmModule.forFeature de todos los módulos NestJS
Mantiene solo providers y controllers
"""

import re
import os
from pathlib import Path

# Lista de módulos a limpiar
modules = [
    "src/bank-account/bank-account.module.ts",
    "src/account/account.module.ts",
    "src/account-card-type/account-card-type.module.ts",
    "src/hose/hose.module.ts",
    "src/vehicle/vehicle.module.ts",
    "src/sale-details/sale-details.module.ts",
    "src/module/module.module.ts",
    "src/account-type/account-type.module.ts",
    "src/cash-register/cash-register.module.ts",
    "src/side/side.module.ts",
    "src/currency/currency.module.ts",
    "src/account-product/account-product.module.ts",
    "src/transaction-controller/transaction-controller.module.ts",
    "src/tank/tank.module.ts",
    "src/authorization-code/authorization-code.module.ts",
    "src/flow-meter/flow-meter.module.ts",
    "src/serie/serie.module.ts",
    "src/product/product.module.ts",
    "src/product-local/product-local.module.ts",
    "src/movement-type/movement-type.module.ts",
    "src/role-access/role-access.module.ts",
    "src/group-serie/group-serie.module.ts",
    "src/account-card-product/account-card-product.module.ts",
    "src/account-card/account-card.module.ts",
    "src/payments/payments.module.ts",
    "src/deposit/deposit.module.ts",
    "src/user/user.module.ts",
    "src/general-type/general-type.module.ts",
    "src/client/client.module.ts",
    "src/driver/driver.module.ts",
    "src/employee/employee.module.ts",
    "src/role/role.module.ts",
]

def clean_module(filepath):
    """Limpia un módulo eliminando TypeOrmModule.forFeature"""
    if not os.path.exists(filepath):
        print(f"⚠️  No encontrado: {filepath}")
        return False
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Backup
    backup_path = filepath + '.backup'
    with open(backup_path, 'w') as f:
        f.write(content)
    
    # Remover import de TypeOrmModule
    content = re.sub(r"import\s*{\s*TypeOrmModule\s*}\s*from\s*['\"]@nestjs/typeorm['\"];\s*\n?", "", content)
    
    # Remover imports de entidades que solo se usan en forFeature
    # Mantener solo imports de servicios y controllers
    lines = content.split('\n')
    new_lines = []
    skip_next = False
    
    for i, line in enumerate(lines):
        # Remover líneas con TypeOrmModule.forFeature
        if 'TypeOrmModule.forFeature' in line:
            # Si está en una línea, skip
            if line.strip().endswith('],'):
                continue
            # Si es multilínea, marcar para skip
            skip_next = True
            continue
        
        if skip_next:
            if '])' in line or '],':
                skip_next = False
                continue
        
        # Remover imports de entidades (*.entity)
        if re.match(r"import.*\.entity['\"]", line):
            continue
            
        new_lines.append(line)
    
    content = '\n'.join(new_lines)
    
    # Limpiar imports vacíos en el array
    content = re.sub(r'imports:\s*\[TypeOrmModule\.forFeature\([^\]]+\)\],?', 'imports: [],', content)
    
    # Escribir archivo limpio
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"✅ Limpiado: {filepath}")
    return True

def main():
    print("🧹 Limpiando TypeOrmModule.forFeature de todos los módulos...\n")
    
    count = 0
    for module_path in modules:
        if clean_module(module_path):
            count += 1
    
    print(f"\n✅ Total de módulos limpiados: {count}/{len(modules)}")
    print("📝 Backups creados con extensión .backup")

if __name__ == "__main__":
    main()
