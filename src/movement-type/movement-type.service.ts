import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementType } from './entities/movement-type.entity';

@Injectable()
export class MovementTypeService {
  constructor(
    @InjectRepository(MovementType)
    private readonly movementTypeRepository: Repository<MovementType>,
  ) {}

  async getMovementTypesForSync(since?: string) {
    const query = this.movementTypeRepository.createQueryBuilder('movement_type');

    if (since) {
      query.where('movement_type.updated_at > :since', { since });
    }

    const types = await query.getMany();

    return types.map(mt => ({
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
