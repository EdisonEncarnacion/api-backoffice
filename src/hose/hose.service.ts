import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hose } from './entities/hose.entity';

@Injectable()
export class HoseService {
  constructor(
    @InjectRepository(Hose)
    private readonly repo: Repository<Hose>,
  ) { }
  async getHosesForSync(since?: string) {
    const query = this.repo
      .createQueryBuilder('h')
      .leftJoin('side', 's', 's.id_side = h.side_id') // JOIN correcto
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
        's.migration_sync_id',   // EL ID INT QUE VA A VENTAS
      ]);

    if (since) {
      query.where('h.updated_at > :since', { since });
    } else {
      query.where('h.state_audit IS NULL').orWhere('h.updated_at > h.created_at');
    }

    const rows = await query.getRawMany();

    return rows.map(r => ({
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
