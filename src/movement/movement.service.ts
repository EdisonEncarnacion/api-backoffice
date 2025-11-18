import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movement } from './entities/movement.entity';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,
  ) {}

  async insertOrUpdateMovements(movements: any[]) {
    const inserted: string[] = [];
    const updated: string[] = [];

    for (const m of movements) {
      const exists = await this.movementRepository.findOne({
        where: { id_movement: m.id_movement },
      });

      if (exists) {
        await this.movementRepository.update(m.id_movement, m);
        updated.push(m.id_movement);
      } else {
        await this.movementRepository.save(m);
        inserted.push(m.id_movement);
      }
    }

    return { inserted, updated };
  }
}
