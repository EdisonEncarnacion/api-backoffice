import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionController } from './entities/transaction-controller.entity';
import { CreateTransactionControllerDto } from './dto/create-transaction-controller.dto';

@Injectable()
export class TransactionControllerService {
  constructor(
    @InjectRepository(TransactionController)
    private readonly repo: Repository<TransactionController>,
  ) {}
  async create(dto: CreateTransactionControllerDto): Promise<TransactionController> {

    const side = await this.repo.query(
      `SELECT id_side FROM side WHERE migration_sync_id = $1 LIMIT 1`,
      [dto.id_side],
    );
  
    if (!side || side.length === 0) {
      throw new NotFoundException(`Side con migration_sync_id ${dto.id_side} no encontrado`);
    }
  
    const entity = this.repo.create({
      ...dto,
      id_side: side[0].id_side, 
    });
  
    return this.repo.save(entity);
  }
}
