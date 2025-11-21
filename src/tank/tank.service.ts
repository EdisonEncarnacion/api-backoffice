import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tank } from './entities/tank.entity';

@Injectable()
export class TankService {
  constructor(
    @InjectRepository(Tank)
    private readonly tankRepository: Repository<Tank>,
  ) {}

  async getTanksForSync(since?: string, local_id?: string) {
    if (!local_id) return [];

    const query = this.tankRepository
      .createQueryBuilder('t')
      .where('t.local_id = :local_id', { local_id });

    if (since) {
      query.andWhere('t.updated_at > :since', { since });
    } else {
      query.andWhere('(t.updated_sync_at IS NULL OR t.updated_at > t.updated_sync_at)');
    }

    const result = await query
      .select([
        't.id AS id',
        't.name AS name',
        't.capacity AS capacity',
        't.product_id AS product_id',
        't.fuel_type AS fuel_type',
        't.location AS location',
        't.state AS state',
        't.initial_stick AS initial_stick',
        't.last_stick AS last_stick',
        't.local_id AS local_id',
        't.created_at AS created_at',
        't.updated_at AS updated_at',
        't.updated_sync_at AS updated_sync_at',
      ])
      .getRawMany();

    return result.map((r) => ({
      id_tank: r.id,
      name: r.name,
      capacity: r.capacity,
      fuel_type: r.fuel_type,
      location: r.location,
      state: r.state,
      initial_stick: r.initial_stick,
      last_stick: r.last_stick,
      id_product: r.product_id,
      id_local: r.local_id,
      created_at: r.created_at,
      updated_at: r.updated_at,
      updated_sync_at: r.updated_sync_at,
    }));
  }
}
