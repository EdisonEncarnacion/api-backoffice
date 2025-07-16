// src/side/side.service.ts
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class SideService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async getSidesByLocal(localId: string) {
    const query = `
      SELECT
        s.id AS id,
        s.id_side,
        s.name,
        s.product_id,
        s.state,
        s.created_at
      FROM side s
      WHERE s.local_id = $1 AND s.state_audit = 'A'
    `;
    return await this.dataSource.query(query, [localId]);
  }
}
