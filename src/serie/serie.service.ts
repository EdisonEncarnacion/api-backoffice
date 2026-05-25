import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Serie } from './entities/serie.entity';
import { UpdateCorrelativeDto } from './dto/update-correlative.dto';

@Injectable()
export class SerieService {
  private readonly logger = new Logger(SerieService.name);

  constructor(private readonly tenantConnection: TenantConnectionProvider) {}

  /**
   * GET /sync/serie?local_id=xxx
   * Backoffice → Ventas: retorna todas las series activas del local
   */
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

  /**
   * POST /sync/serie/correlative
   * Ventas → Backoffice: actualiza correlative_current de una serie
   * Body puede ser un objeto { id_serie, correlative_current }
   *       o un array de ellos (sync masivo)
   */
  async updateCorrelativeCurrent(payload: UpdateCorrelativeDto | UpdateCorrelativeDto[]) {
    const dataSource = await this.tenantConnection.getDataSource();
    const serieRepository = dataSource.getRepository(Serie);

    const items = Array.isArray(payload) ? payload : [payload];
    const updated: string[] = [];
    const notFound: string[] = [];

    for (const item of items) {
      const serie = await serieRepository.findOne({
        where: { id_serie: item.id_serie },
      });

      if (!serie) {
        this.logger.warn(`[Serie] id_serie no encontrado: ${item.id_serie}`);
        notFound.push(item.id_serie);
        continue;
      }

      // Solo actualizar si el valor recibido es mayor (evita retrocesos)
      if (item.correlative_current > (serie.correlative_current ?? 0)) {
        serie.correlative_current = item.correlative_current;
        serie.updated_at = new Date();
        await serieRepository.save(serie);
        this.logger.log(
          `[Serie] correlative_current actualizado: serie=${item.id_serie} → ${item.correlative_current}`,
        );
        updated.push(item.id_serie);
      } else {
        this.logger.debug(
          `[Serie] Sin cambio: serie=${item.id_serie} actual=${serie.correlative_current} recibido=${item.correlative_current}`,
        );
      }
    }

    return {
      message: `${updated.length} serie(s) actualizadas`,
      updated,
      notFound,
    };
  }
}
