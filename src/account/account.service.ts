import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getAccountsForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const accountRepository = dataSource.getRepository(Account);

    const query = accountRepository.createQueryBuilder('account');

    if (since) {
      query.where('account.updated_at > :since', { since });
    }

    const accounts = await query.getMany();

    return accounts.map((a) => ({
      id_account: a.id_account,
      credit_line: a.credit_line,
      balance: a.balance,
      start_date: a.start_date,
      end_date: a.end_date,
      billing_days: a.billing_days,
      credit_days: a.credit_days,
      installments: a.installments,
      attachment_url: a.attachment_url,
      client_id: a.client_id,
      account_type_id: a.account_type_id,
      status: a.status,
      created_at: a.created_at,
      updated_at: a.updated_at,
      state_audit: a.state_audit,
    }));
  }
}

