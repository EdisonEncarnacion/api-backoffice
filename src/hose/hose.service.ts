import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Hose } from './entities/hose.entity';

@Injectable()
export class HoseService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getHosesForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const repo = dataSource.getRepository(Hose);

    // Get the tenant's local ID
    const localResult = await dataSource.query('SELECT id_local FROM local LIMIT 1');
    const tenantLocalId = localResult[0]?.id_local;

    if (!tenantLocalId) {
      return [];
    }

    const query = repo
      .createQueryBuilder('h')
      .leftJoin('side', 's', 's.id_side = h.side_id')
      .select([
        'h.id_hose',
        'h.hose_name',
        'h.hose_position',
        'h.initial_cm',
        'h.last_cm',
        'h.product_id',
        'h.tank_id',
        'h.created_at',
        'h.updated_at',
        'h.state_audit',
        'h.id_local',
        's.migration_sync_id',
      ])
      .where('h.id_local = :tenantLocalId', { tenantLocalId });

    if (since) {
      query.andWhere('h.updated_at > :since', { since });
    } else {
      query.andWhere(
        '(h.state_audit IS NULL OR h.updated_at > h.created_at)'
      );
    }

    const rows = await query.getRawMany();

    return rows.map((r) => ({
      id_hose: r.h_id_hose,
      hose_name: r.h_hose_name,
      hose_position: r.h_hose_position,
      initial_cm: r.h_initial_cm,
      last_cm: r.h_last_cm,
      product_id: r.h_product_id,
      tank_id: r.h_tank_id,
      id_side: r.s_migration_sync_id,
      created_at: r.h_created_at,
      updated_at: r.h_updated_at,
      state_audit: r.h_state_audit,
      id_local: r.h_id_local,
    }));
  }
}

