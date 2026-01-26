import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';

/**
 * UuidMapperService - Mapea IDs de migración a UUIDs
 * REFACTORIZADO para arquitectura multitenant
 * Usa TenantConnectionProvider en lugar de DataSource global
 */
@Injectable()
export class UuidMapperService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async mapIdToUuid(
    tableName: string,
    migrationSyncId: number | null | undefined,
  ): Promise<string | null> {
    // 🧩 Permitir null en transacciones
    if (
      (migrationSyncId === null || migrationSyncId === undefined) &&
      tableName === 'transaction_controller'
    ) {
      return null;
    }

    if (migrationSyncId === null || migrationSyncId === undefined) {
      throw new Error(
        `El campo migrationSyncId para la tabla '${tableName}' no puede ser NULL`,
      );
    }

    // 🗺️ Mapeos de tablas
    const tableMap: Record<string, { column: string; whereColumn: string }> = {
      local: { column: 'id_local', whereColumn: 'migration_sync_id' },
      user_auth: { column: 'id_user', whereColumn: 'migration_sync_id' },
      payment_type: {
        column: 'id_payment_type',
        whereColumn: 'migration_sync_id',
      },
      transaction_controller: {
        column: 'id_transaction',
        whereColumn: 'migration_sync_id',
      },
      side: { column: 'id_side', whereColumn: 'migration_sync_id' },
      cash_register: {
        column: 'id_cash_register',
        whereColumn: 'cash_register_code',
      },
      hose: { column: 'id_hose', whereColumn: 'migration_sync_id' },
    };

    const mapping = tableMap[tableName];

    if (!mapping) {
      throw new Error(`No hay configuración de mapeo para la tabla '${tableName}'`);
    }

    // Obtener DataSource del tenant actual
    const dataSource = await this.tenantConnection.getDataSource();

    const result = await dataSource.query(
      `SELECT ${mapping.column} FROM ${tableName} WHERE ${mapping.whereColumn} = $1 LIMIT 1`,
      [migrationSyncId],
    );

    if (result.length === 0) {
      throw new Error(
        `No se encontró UUID en la tabla '${tableName}' para ${mapping.whereColumn} = ${migrationSyncId}`,
      );
    }

    return result[0][mapping.column];
  }
}
