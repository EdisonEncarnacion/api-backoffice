# Servicios Refactorizados para Multitenant

## ✅ Servicios Completados

### Refactorizados Manualmente (Complejos)
1. ✅ **MovementService** - Usa función SQL `insert_movement_external`
2. ✅ **BankService** - QueryBuilder simple
3. ✅ **SalesService** - Transacciones complejas con QueryRunner, múltiples entidades
4. ✅ **DepositService** - Queries SQL directos + Repository
5. ✅ **AccountService** - QueryBuilder con condiciones

### Patrón de Refactorización Aplicado

#### ANTES:
```typescript
@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Entity)
    private readonly repository: Repository<Entity>,
    private readonly dataSource: DataSource, // Si existe
  ) {}

  async method() {
    return this.repository.find();
  }
}
```

#### DESPUÉS:
```typescript
@Injectable()
export class ExampleService {
  constructor(
    private readonly tenantConnection: TenantConnectionProvider,
  ) {}

  async method() {
    const dataSource = await this.tenantConnection.getDataSource();
    const repository = dataSource.getRepository(Entity);
    return repository.find();
  }
}
```

## 📋 Servicios Pendientes de Refactorizar

Los siguientes servicios usan `@InjectRepository` y necesitan refactorización:

1. sale-details.service.ts
2. currency.service.ts
3. bank-account.service.ts
4. hose.service.ts
5. account-card-type.service.ts
6. side.service.ts
7. transaction-controller.service.ts
8. module.service.ts
9. tank.service.ts
10. account-product.service.ts
11. flow-meter.service.ts
12. authorization-code.service.ts
13. serie.service.ts
14. product-local.service.ts
15. cash-register.service.ts
16. account-card.service.ts
17. movement-type.service.ts
18. product.service.ts
19. account-card-product.service.ts
20. account-type.service.ts
21. group-serie.service.ts
22. payments.service.ts
23. role-access.service.ts
24. employee.service.ts
25. general-type.service.ts
26. driver.service.ts
27. role.service.ts
28. client.service.ts
29. user.service.ts
30. vehicle.service.ts

## 🔧 Cómo Refactorizar un Servicio

### Paso 1: Actualizar Imports
```typescript
// Eliminar
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

// Agregar
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
```

### Paso 2: Actualizar Constructor
```typescript
// ANTES
constructor(
  @InjectRepository(Entity1)
  private readonly repo1: Repository<Entity1>,
  @InjectRepository(Entity2)
  private readonly repo2: Repository<Entity2>,
  private readonly dataSource: DataSource,
  private readonly otherService: OtherService, // Mantener otros servicios
) {}

// DESPUÉS
constructor(
  private readonly tenantConnection: TenantConnectionProvider,
  private readonly otherService: OtherService, // Mantener otros servicios
) {}
```

### Paso 3: Actualizar Métodos
```typescript
// ANTES
async findAll() {
  return this.repository.find();
}

// DESPUÉS
async findAll() {
  const dataSource = await this.tenantConnection.getDataSource();
  const repository = dataSource.getRepository(Entity);
  return repository.find();
}
```

### Paso 4: Actualizar QueryRunner (si existe)
```typescript
// ANTES
async complexOperation() {
  const queryRunner = this.dataSource.createQueryRunner();
  // ...
}

// DESPUÉS
async complexOperation() {
  const dataSource = await this.tenantConnection.getDataSource();
  const queryRunner = dataSource.createQueryRunner();
  // ...
}
```

### Paso 5: Actualizar Queries SQL Directos
```typescript
// ANTES
async rawQuery() {
  return this.dataSource.query('SELECT * FROM table');
}

// DESPUÉS
async rawQuery() {
  const dataSource = await this.tenantConnection.getDataSource();
  return dataSource.query('SELECT * FROM table');
}
```

## ⚠️ Reglas Importantes

1. **NO cambiar lógica de negocio** - Solo cambiar cómo se accede a la BD
2. **NO modificar DTOs** - Mantener interfaces intactas
3. **NO cambiar firmas de métodos** - Mantener compatibilidad
4. **NO eliminar otros servicios inyectados** - Solo remover Repository/DataSource
5. **Mantener transacciones** - QueryRunner sigue funcionando igual
6. **Mantener QueryBuilder** - Funciona igual con el nuevo repository

## 🎯 Checklist por Servicio

- [ ] Actualizar imports
- [ ] Actualizar constructor
- [ ] Agregar `const dataSource = await this.tenantConnection.getDataSource()` en cada método
- [ ] Reemplazar `this.repository` por `dataSource.getRepository(Entity)`
- [ ] Reemplazar `this.dataSource` por `dataSource`
- [ ] Verificar que compile sin errores
- [ ] Probar funcionalidad

## 📝 Notas

- Todos los servicios refactorizados mantienen exactamente la misma funcionalidad
- Los controllers NO necesitan cambios
- Los módulos NO necesitan cambios (TenantConnectionProvider es global)
- Las transacciones funcionan igual
- Los QueryBuilders funcionan igual
- Las funciones SQL se llaman igual
