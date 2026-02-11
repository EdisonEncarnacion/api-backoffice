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
      .innerJoin('account_card.account', 'account')
      .where('account.local_id = :local_id', { local_id });

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

