import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateMovementDto } from './dto/create-movement.dto';

@Injectable()
export class MovementService {
  constructor(private readonly dataSource: DataSource) { }

  async insertMovement(dto: CreateMovementDto) {
    const query = `
    SELECT insert_movement_external(
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
    )
  `;

    const params = [
      dto.id_movement,
      dto.account_id,
      dto.card_id,
      dto.type_id,
      dto.status,
      dto.reference_document,
      dto.amount,
      dto.balance_after,
      dto.issued_at,
      dto.description,
      dto.created_at,
      dto.updated_at,
      dto.created_by,
    ];

    await this.dataSource.query(query, params);
    return { ok: true };
  }

}

