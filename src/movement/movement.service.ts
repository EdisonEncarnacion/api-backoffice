import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateMovementDto } from './dto/create-movement.dto';

@Injectable()
export class MovementService {
  constructor(private readonly dataSource: DataSource) {}

  async insertMovement(dto: CreateMovementDto) {
        const query = `
        SELECT * FROM insert_movement_with_balance_update(
          $1, $2, $3, $4, $5, $6, $7
        )
      `;
          const params = [
          dto.account_id || null,
          dto.amount,
          dto.reference_document || null,
          dto.card_id || null,
          dto.description || null,
          dto.type_id,
          dto.status || 'A'
        ];


    const result = await this.dataSource.query(query, params);
    return result?.[0]; 
  }
}

