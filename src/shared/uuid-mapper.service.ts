import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UuidMapperService {
  constructor(private readonly dataSource: DataSource) {}

  async mapIdToUuid(tableName: string, id: number): Promise<string> {
    const tableMap: Record<string, { column: string; whereColumn: string }> = {
      local: { column: 'id_local', whereColumn: 'id' },
      user_auth: { column: 'id_user', whereColumn: 'id' },
      payment_type: { column: 'id_payment_type', whereColumn: 'id' },
      sale_document_type: { column: 'id_sale_document_type', whereColumn: 'id' },
      transaction_controller: { column: 'id_transaction', whereColumn: 'id' },
      side: { column: 'id_side', whereColumn: 'id' },

      cash_register: { column: 'id_cash_register', whereColumn: 'cash_register_code' },
    };

    const mapping = tableMap[tableName];

    if (!mapping) {
      throw new Error(`No hay configuración de mapeo para la tabla '${tableName}'`);
    }

    const result = await this.dataSource.query(
      `SELECT ${mapping.column} FROM ${tableName} WHERE ${mapping.whereColumn} = $1 LIMIT 1`,
      [id]
    );

    if (result.length === 0) {
      throw new Error(`No se encontró UUID en la tabla '${tableName}' para ${mapping.whereColumn} = ${id}`);
    }

    return result[0][mapping.column];
  }
}
