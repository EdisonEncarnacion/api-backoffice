import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UuidMapperService {
  constructor(private readonly dataSource: DataSource) {}

async mapIdToUuid(
  tableName: string,
  migrationSyncId: number | null | undefined
): Promise<string | null> {
  
  if ((migrationSyncId === null || migrationSyncId === undefined) && tableName === 'transaction_controller') {
    return null;
  }

  if (migrationSyncId === null || migrationSyncId === undefined) {
    throw new Error(
      `El campo migrationSyncId para la tabla '${tableName}' no puede ser NULL`
    );
  }

  const tableMap: Record<string, { column: string; whereColumn: string }> = {
    local: { column: 'id_local', whereColumn: 'migration_sync_id' },
    user_auth: { column: 'id_user', whereColumn: 'migration_sync_id' },
    payment_type: { column: 'id_payment_type', whereColumn: 'migration_sync_id' },
    transaction_controller: { column: 'id_transaction', whereColumn: 'migration_sync_id' },
    side: { column: 'id_side', whereColumn: 'migration_sync_id' },
    cash_register: { column: 'id_cash_register', whereColumn: 'cash_register_code' },
  };

    const mapping = tableMap[tableName];

    if (!mapping) {
      throw new Error(`No hay configuración de mapeo para la tabla '${tableName}'`);
    }

    const result = await this.dataSource.query(
      `SELECT ${mapping.column} FROM ${tableName} WHERE ${mapping.whereColumn} = $1 LIMIT 1`,
      [migrationSyncId]
    );

    if (result.length === 0) {
      throw new Error(`No se encontró UUID en la tabla '${tableName}' para ${mapping.whereColumn} = ${migrationSyncId}`);
    }

    return result[0][mapping.column];
  }
}
