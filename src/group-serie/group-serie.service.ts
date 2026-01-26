import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { GroupSerie } from './entities/group-serie.entity';

@Injectable()
export class GroupSerieService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getGroupSeriesByLocal(local_id: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const groupSerieRepository = dataSource.getRepository(GroupSerie);

    const result = await groupSerieRepository
      .createQueryBuilder('g')
      .where('g.id_local = :local_id', { local_id })
      .andWhere("g.state_audit = 'A'")
      .select([
        'g.id_group_serie AS id_group_serie',
        'g.id_tipo AS id_tipo',
        'g.description AS description',
        'g.is_used AS is_used',
        'g.id_local AS id_local',
        'g.created_at AS created_at',
        'g.updated_at AS updated_at',
      ])
      .getRawMany();

    return result;
  }
}

