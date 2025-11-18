import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountCardType } from './entities/account-card-type.entity';

@Injectable()
export class AccountCardTypeService {
  constructor(
    @InjectRepository(AccountCardType)
    private readonly accountCardTypeRepository: Repository<AccountCardType>,
  ) {}

  async getAccountCardTypesForSync(since?: string) {
    const query = this.accountCardTypeRepository.createQueryBuilder('account_card_type');

    if (since) {
      query.where('account_card_type.updated_at > :since', { since });
    } else {
      query.where('account_card_type.updated_sync_at IS NULL')
           .orWhere('account_card_type.updated_at > account_card_type.updated_sync_at');
    }

    const accountCardTypes = await query.getMany();

    return accountCardTypes.map(a => ({
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
