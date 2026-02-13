import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getAccountsForSync(since?: string, local_id?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const accountRepository = dataSource.getRepository(Account);

    const query = accountRepository.createQueryBuilder('account');

    // Multi-tenant logic:
    // - Global accounts: local_id IS NULL (synchronized to all tenants)
    // - Tenant-specific accounts: local_id = specific value (synchronized only to that tenant)
    if (local_id) {
      // If local_id is provided, return both:
      // 1. Accounts specific to this tenant (account.local_id = :local_id)
      // 2. Global accounts available to all tenants (account.local_id IS NULL)
      query.where('(account.local_id = :local_id OR account.local_id IS NULL)', { local_id });
    }
    // If local_id is NOT provided, return all accounts (no local filter)

    // Apply the 'since' filter for incremental sync
    if (since) {
      query.andWhere('account.updated_at > :since', { since });
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
      local_id: a.local_id,
    }));
  }
}

