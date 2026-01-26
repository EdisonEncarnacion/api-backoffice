# ⚠️ MIGRACIÓN DESACTIVADA

Esta migración **NO DEBE EJECUTARSE** porque la tabla `tenant` ya existe en la base de datos master.

## Razón

El esquema real de la BD master ya tiene la tabla `tenant` con las siguientes columnas:
- id (uuid)
- name
- dbName
- subdomain
- domain
- connectionUri
- isActive
- plan
- subscriptionStart
- subscriptionEnd
- contactEmail
- logoUrl
- settings (jsonb)
- created_at
- updated_at
- state_audit

Esta migración fue creada asumiendo un esquema diferente (tabla `tenants` con columnas `db_host`, `db_port`, `status`, etc.) que **NO coincide** con el esquema real.

## Solución

La entidad `TenantEntity` ha sido actualizada para mapear correctamente la tabla `tenant` existente.

**NO ejecutar migraciones en la BD master.**
