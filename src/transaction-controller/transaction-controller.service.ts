import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { TransactionController } from './entities/transaction-controller.entity';
import { CreateTransactionControllerDto } from './dto/create-transaction-controller.dto';

@Injectable()
export class TransactionControllerService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async create(dto: CreateTransactionControllerDto): Promise<TransactionController> {
    const dataSource = await this.tenantConnection.getDataSource();
    const repo = dataSource.getRepository(TransactionController);

    const side = await dataSource.query(
      `SELECT id_side FROM side WHERE migration_sync_id = $1 LIMIT 1`,
      [dto.id_side],
    );

    if (!side || side.length === 0) {
      throw new NotFoundException(`Side con migration_sync_id ${dto.id_side} no encontrado`);
    }

    const entity = repo.create({
      ...dto,
      id_side: side[0].id_side,
    });

    return repo.save(entity);
  }
}

