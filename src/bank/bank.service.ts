import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BankService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getBanksForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const bankRepo = dataSource.getRepository(Bank);

    const query = bankRepo.createQueryBuilder('bank');

    if (since) {
      query.where('bank.updated_at > :since', { since });
    }

    const banks = await query.getMany();

    return banks.map((b) => ({
      id_bank: b.id_bank,
      code: b.code,
      name: b.name,
      is_active: b.is_active,
      created_at: b.created_at,
      updated_at: b.updated_at,
      state_audit: b.state_audit,
    }));
  }
}

