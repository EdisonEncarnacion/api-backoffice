import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { AccountType } from './entities/account-type.entity';

@Injectable()
export class AccountTypeService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getAccountTypesForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const accountTypeRepository = dataSource.getRepository(AccountType);

    const query = accountTypeRepository.createQueryBuilder('account_type');

    if (since) {
      query.where('account_type.updated_at > :since', { since });
    }

    const accountTypes = await query.getMany();

    return accountTypes.map((a) => ({
      id_account_type: a.id_account_type,
      code: a.code,
      name: a.name,
      description: a.description,
      created_at: a.created_at,
      updated_at: a.updated_at,
      state_audit: a.state_audit,
    }));
  }
}

