import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountProduct } from './entities/account-product.entity';

@Injectable()
export class AccountProductService {
  constructor(
    @InjectRepository(AccountProduct)
    private readonly accountProductRepository: Repository<AccountProduct>,
  ) {}

  async getAccountProductsForSync(since?: string) {
    const query = this.accountProductRepository.createQueryBuilder('account_product');

    if (since) {
      query.where('account_product.updated_at > :since', { since });
    } else {
      query.where('account_product.updated_sync_at IS NULL')
           .orWhere('account_product.updated_at > account_product.updated_sync_at');
    }

    const accountProducts = await query.getMany();

    return accountProducts.map(ap => ({
      id_account_card_product: ap.id_account_card_product,
      id_account: ap.id_account,
      id_product: ap.id_product,
      created_at: ap.created_at,
      updated_at: ap.updated_at,
      state_audit: ap.state_audit,
    }));
  }
}
