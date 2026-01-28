import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { AccountCardProduct } from './entities/account-card-product.entity';

@Injectable()
export class AccountCardProductService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getAccountCardProductsForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const repo = dataSource.getRepository(AccountCardProduct);

    const query = repo.createQueryBuilder('acp');

    if (since) {
      query.where('acp.updated_at > :since', { since });
    }

    const rows = await query.getMany();

    return rows.map((r) => ({
      id_account_card_product: r.id_account_card_product,
      is_active: r.is_active,
      created_at: r.created_at,
      updated_at: r.updated_at,
      state_audit: r.state_audit,
      id_account_card: r.id_account_card,
      id_product: r.id_product,
    }));
  }
}
