import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Side } from './entities/side.entity';

@Injectable()
export class SideService {
  constructor(
    @InjectRepository(Side)
    private readonly sideRepository: Repository<Side>,
  ) {}

  async getSidesByLocal(local_id: string) {
    const result = await this.sideRepository
      .createQueryBuilder('s')
      .where('s.local_id = :local_id', { local_id })
      .andWhere("s.state_audit = 'A'")
      .select([
        's.id_side AS id_side',
        's.name AS name',
        's.product_id AS product_id',
        's.state AS state',
        's.migration_sync_id AS migration_sync_id',
        's.created_at AS created_at',
        's.updated_at AS updated_at',
      ])
      .getRawMany();

    return result;
  }
}
