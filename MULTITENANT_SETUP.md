# Arquitectura Multitenant - Guía de Implementación

## 📋 Resumen

Este proyecto implementa una arquitectura multitenant profesional basada en subdominios con las siguientes características:

✅ **UNA SOLA API** para todos los tenants  
✅ **Aislamiento por base de datos**: cada tenant tiene su propia BD PostgreSQL  
✅ **Resolución dinámica**: el subdominio determina qué BD usar  
✅ **BD Master centralizada**: almacena metadata y credenciales de tenants  
✅ **Zero-downtime migrations**: migraciones controladas fuera del runtime  
✅ **Connection pooling**: reutilización eficiente de conexiones por tenant  

## 🚀 Configuración Inicial

### 1. Variables de Entorno

El archivo `.env.development` ya está configurado con:

```bash
# Tenant Database (current - will be used by dev tenant)
DATABASE_HOST=192.168.18.137
DATABASE_PORT=5455
DATABASE_NAME=development
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres

# Master Database (stores tenant metadata)
MASTER_DB_HOST=192.168.18.137
MASTER_DB_PORT=5455
MASTER_DB_NAME=master_db
MASTER_DB_USER=postgres
MASTER_DB_PASSWORD=postgres

# Development Tenant
DEV_TENANT_SUBDOMAIN=dev

# Encryption Key (32 bytes hex)
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef

# Application
NODE_ENV=development
PORT=3006
```

### 2. Crear Base de Datos Master

```bash
# Conectarse a PostgreSQL
psql -h 192.168.18.137 -p 5455 -U postgres

# Crear base de datos master
CREATE DATABASE master_db;
```

### 3. Ejecutar Migraciones de Master

```bash
npm run migration:run:master
```

Esto creará la tabla `tenants` en la BD Master.

### 4. Registrar Tenant de Desarrollo

```sql
-- Conectarse a master_db
psql -h 192.168.18.137 -p 5455 -U postgres -d master_db

-- Insertar tenant de desarrollo
INSERT INTO tenants (
  subdomain, 
  company_name, 
  db_host, 
  db_port, 
  db_name, 
  db_user, 
  db_password, 
  status
) VALUES (
  'dev', 
  'Development Tenant', 
  '192.168.18.137', 
  5455, 
  'development', 
  'postgres', 
  'postgres', 
  'active'
);
```

### 5. Ejecutar Migraciones de Tenant

```bash
# Ejecutar migraciones en la BD del tenant de desarrollo
npm run migration:run:tenant
```

### 6. Iniciar la Aplicación

```bash
npm run start:dev
```

La aplicación estará disponible en `http://localhost:3006`

## 📁 Estructura del Proyecto

```
src/
├── config/
│   ├── database.config.ts          # Config BD Master
│   ├── master.datasource.ts        # DataSource para migraciones master
│   └── tenant.datasource.ts        # DataSource para migraciones tenant
├── tenant/
│   ├── entities/
│   │   └── tenant.entity.ts        # Entidad Tenant
│   ├── guards/
│   │   └── tenant-active.guard.ts  # Guard de validación
│   ├── providers/
│   │   └── tenant-connection.provider.ts  # Provider request-scoped
│   ├── tenant.middleware.ts        # Middleware de subdominio
│   ├── tenant.resolver.ts          # Resolver de tenant
│   ├── tenant-connection.manager.ts # Manager de conexiones
│   └── tenant.module.ts            # Módulo tenant
├── utils/
│   └── encryption.util.ts          # Utilidades de encriptación
├── migrations/
│   ├── master/                     # Migraciones BD Master
│   │   └── 1737310000000-CreateTenantsTable.ts
│   └── tenant/                     # Migraciones BDs Tenant
│       └── (tus migraciones aquí)
└── app.module.ts                   # Módulo principal
```

## 🔧 Comandos Disponibles

### Migraciones Master

```bash
# Generar nueva migración para master
npm run migration:generate:master src/migrations/master/NombreMigracion

# Ejecutar migraciones master
npm run migration:run:master

# Revertir última migración master
npm run migration:revert:master
```

### Migraciones Tenant

```bash
# Generar nueva migración para tenant
npm run migration:generate:tenant src/migrations/tenant/NombreMigracion

# Ejecutar migraciones en un tenant específico
npm run migration:run:tenant

# Ejecutar migraciones en TODOS los tenants activos
npm run migrate:all
```

### Gestión de Tenants

```bash
# Crear nuevo tenant
npm run tenant:setup <subdomain> <db_name> <db_user> <db_password> [db_host] [db_port]

# Ejemplo:
npm run tenant:setup empresa1 empresa1_db empresa1_user password123 192.168.18.137 5455
```

## 🏗️ Crear un Nuevo Tenant

### Opción 1: Usando el Script

```bash
# 1. Crear la base de datos PostgreSQL
createdb -h 192.168.18.137 -p 5455 -U postgres empresa1_db

# 2. Ejecutar script de setup
npm run tenant:setup empresa1 empresa1_db postgres postgres 192.168.18.137 5455
```

### Opción 2: Manual

```bash
# 1. Crear la base de datos
createdb -h 192.168.18.137 -p 5455 -U postgres empresa1_db

# 2. Ejecutar migraciones
export TYPEORM_HOST=192.168.18.137
export TYPEORM_PORT=5455
export TYPEORM_DATABASE=empresa1_db
export TYPEORM_USERNAME=postgres
export TYPEORM_PASSWORD=postgres
npm run migration:run:tenant

# 3. Registrar en BD Master
psql -h 192.168.18.137 -p 5455 -U postgres -d master_db <<EOF
INSERT INTO tenants (subdomain, company_name, db_host, db_port, db_name, db_user, db_password, status)
VALUES ('empresa1', 'Empresa 1 Inc.', '192.168.18.137', 5455, 'empresa1_db', 'postgres', 'postgres', 'active');
EOF
```

## 🔐 Seguridad

### Encriptación de Credenciales

Para encriptar las credenciales de los tenants:

```typescript
import { encrypt, decrypt } from './utils/encryption.util';

// Encriptar
const encryptedPassword = encrypt('password123');

// Desencriptar
const plainPassword = decrypt(encryptedPassword);
```

### Guards de Validación

```typescript
import { TenantActiveGuard } from './tenant/guards/tenant-active.guard';

@Controller('api/movements')
@UseGuards(TenantActiveGuard)
export class MovementsController {
  // Solo permite acceso si el tenant está activo
}
```

## 🧪 Testing en Desarrollo

### Usando localhost

La aplicación está configurada para usar el tenant `dev` cuando accedes desde `localhost`:

```bash
# Inicia la aplicación
npm run start:dev

# Accede desde el navegador o Postman
http://localhost:3006/api/movements
```

El middleware automáticamente usará el tenant `dev` configurado en `.env.development`.

### Usando subdominios en desarrollo

Para probar con subdominios reales en desarrollo, edita tu archivo `/etc/hosts`:

```bash
# /etc/hosts
127.0.0.1 empresa1.localhost
127.0.0.1 empresa2.localhost
```

Luego accede a:
```
http://empresa1.localhost:3006/api/movements
```

## 📊 Flujo de Request

```
1. Cliente → GET /api/movements
   Host: empresa1.midominio.com

2. TenantMiddleware → Extrae "empresa1"

3. TenantResolver → Consulta BD Master
   SELECT * FROM tenants WHERE subdomain = 'empresa1'

4. TenantConnectionManager → Obtiene/crea conexión
   - Verifica cache
   - Si no existe, crea DataSource con credenciales del tenant
   - Guarda en cache

5. TenantConnectionProvider → Inyecta DataSource en request

6. Business Service → Ejecuta lógica usando DataSource del tenant

7. Response → 200 OK + JSON
```

## ⚠️ Errores Comunes

### Error: "Tenant 'dev' not found"

**Solución**: Registra el tenant de desarrollo en la BD Master (ver paso 4 de Configuración Inicial).

### Error: "Cannot connect to master database"

**Solución**: Verifica que la BD Master existe y las credenciales en `.env.development` son correctas.

### Error: "Migration failed"

**Solución**: Verifica que las migraciones están en la carpeta correcta:
- Master: `src/migrations/master/`
- Tenant: `src/migrations/tenant/`

## 🚀 Despliegue en Producción

### 1. Variables de Entorno

Crea `.env.production` con:

```bash
# Master Database
MASTER_DB_HOST=master-db.production.com
MASTER_DB_PORT=5432
MASTER_DB_NAME=master_db
MASTER_DB_USER=master_user
MASTER_DB_PASSWORD=secure_password

# Encryption Key (genera uno nuevo con: openssl rand -hex 32)
ENCRYPTION_KEY=<tu_clave_segura_aquí>

# Application
NODE_ENV=production
PORT=3000
```

### 2. Ejecutar Migraciones

```bash
# Build
npm run build

# Migrar BD Master
npm run migration:run:master

# Migrar todos los tenants
npm run migrate:all
```

### 3. Iniciar Aplicación

```bash
npm run start:prod
```

## 📝 Notas Importantes

1. **NUNCA ejecutes migraciones en runtime** - Las migraciones solo se ejecutan mediante scripts CLI.

2. **Cada tenant debe tener el mismo esquema** - Usa `npm run migrate:all` después de cada deploy.

3. **Connection pooling** - Cada tenant tiene su propio pool de conexiones (default: 10 conexiones).

4. **Para +50 tenants concurrentes** - Considera usar PgBouncer como connection pooler.

5. **Encriptación de credenciales** - En producción, usa la función `encrypt()` antes de guardar passwords en la BD Master.

## 🆘 Soporte

Para más información, consulta la documentación completa en `multitenant_architecture.md`.
