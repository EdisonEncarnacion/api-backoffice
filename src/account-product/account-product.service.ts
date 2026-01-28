import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { AccountProduct } from './entities/account-product.entity';

@Injectable()
export class AccountProductService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getAccountProductsForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const accountProductRepository = dataSource.getRepository(AccountProduct);

    const query = accountProductRepository.createQueryBuilder('account_product');

    if (since) {
      query.where('account_product.updated_at > :since', { since });
    }

    const accountProducts = await query.getMany();

    return accountProducts.map((ap) => ({
      id_account_card_product: ap.id_account_card_product,
      id_account: ap.id_account,
      id_product: ap.id_product,
      created_at: ap.created_at,
      updated_at: ap.updated_at,
      state_audit: ap.state_audit,
    }));
  }
}

