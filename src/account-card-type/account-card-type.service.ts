import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { AccountCardType } from './entities/account-card-type.entity';

@Injectable()
export class AccountCardTypeService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getAccountCardTypesForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const accountCardTypeRepository = dataSource.getRepository(AccountCardType);

    const query = accountCardTypeRepository.createQueryBuilder('account_card_type');

    if (since) {
      query.where('account_card_type.updated_at > :since', { since });
    }

    const accountCardTypes = await query.getMany();

    return accountCardTypes.map((a) => ({
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

