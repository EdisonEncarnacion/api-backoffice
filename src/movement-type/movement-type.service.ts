import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { MovementType } from './entities/movement-type.entity';

@Injectable()
export class MovementTypeService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getMovementTypesForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const movementTypeRepository = dataSource.getRepository(MovementType);

    const query = movementTypeRepository.createQueryBuilder('movement_type');

    if (since) {
      query.where('movement_type.updated_at > :since', { since });
    }

    const types = await query.getMany();

    return types.map((mt) => ({
      id_movement_document_type: mt.id_movement_document_type,
      code: mt.code,
      name: mt.name,
      is_active: mt.is_active,
      created_at: mt.created_at,
      updated_at: mt.updated_at,
      state_audit: mt.state_audit,
    }));
  }
}

