import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Side } from './entities/side.entity';

@Injectable()
export class SideService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getSidesByLocal(local_id: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const sideRepository = dataSource.getRepository(Side);

    const result = await sideRepository
      .createQueryBuilder('s')
      .where('s.local_id = :local_id', { local_id })
      .andWhere("s.state_audit = 'A'")
      .select([
        's.id_side AS id_side',
        's.name AS name',
        's.product_id AS product_id',
        's.state AS state',
        's.created_at AS created_at',
        's.updated_at AS updated_at',
      ])
      .getRawMany();

    return result;
  }
}

