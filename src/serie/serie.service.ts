import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Serie } from './entities/serie.entity';

@Injectable()
export class SerieService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getSeriesByLocal(local_id: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const serieRepository = dataSource.getRepository(Serie);

    const result = await serieRepository
      .createQueryBuilder('s')
      .where('s.id_local = :local_id', { local_id })
      .andWhere("s.state_audit = 'A'")
      .select([
        's.id_serie AS id_serie',
        's.correlative_start AS correlative_start',
        's.series_number AS series_number',
        's.correlative_current AS correlative_current',
        's.description AS description',
        's.id_group_serie AS id_group_serie',
        's.id_sale_document_type AS id_sale_document_type',
        's.origin_document_type_id AS origin_document_type_id',
        's.is_active AS is_active',
        's.id_local AS id_local',
        's.created_at AS created_at',
        's.updated_at AS updated_at',
      ])
      .getRawMany();

    return result;
  }
}

