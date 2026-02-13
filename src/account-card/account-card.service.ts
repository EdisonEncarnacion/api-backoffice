import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { AccountCard } from './entities/account-card.entity';

@Injectable()
export class AccountCardService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getAccountCardsForSync(since?: string, local_id?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const accountCardRepository = dataSource.getRepository(AccountCard);

    const query = accountCardRepository.createQueryBuilder('account_card')
      .innerJoin('account_card.account', 'account');

    // Multi-tenant logic based on parent Account:
    // - Global accounts: account.local_id IS NULL → cards synchronized to all tenants
    // - Tenant-specific accounts: account.local_id = value → cards synchronized only to that tenant
    if (local_id) {
      // If local_id is provided, return cards from both:
      // 1. Accounts specific to this tenant (account.local_id = :local_id)
      // 2. Global accounts available to all tenants (account.local_id IS NULL)
      query.where('(account.local_id = :local_id OR account.local_id IS NULL)', { local_id });
    }
    // If local_id is NOT provided, return all cards (no local filter)

    // Apply the 'since' filter for incremental sync on account_card
    if (since) {
      query.andWhere('account_card.updated_at > :since', { since });
    }

    const cards = await query.getMany();

    return cards.map((c) => ({
      id_account_card: c.id_account_card,
      card_number: c.card_number,
      balance: c.balance,
      card_type_id: c.card_type_id,
      vehicle_id: c.vehicle_id,
      account_id: c.account_id,
      status: c.status,
      state_audit: c.state_audit,
      created_at: c.created_at,
      updated_at: c.updated_at,
    }));
  }
}

