import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serie } from './entities/serie.entity';

@Injectable()
export class SerieService {
  constructor(
    @InjectRepository(Serie)
    private readonly serieRepository: Repository<Serie>,
  ) {}

  async getSeriesByLocal(local_id: string) {
    const result = await this.serieRepository
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
