import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountType } from './entities/account-type.entity';

@Injectable()
export class AccountTypeService {
  constructor(
    @InjectRepository(AccountType)
    private readonly accountTypeRepository: Repository<AccountType>,
  ) {}

  async getAccountTypesForSync(since?: string) {
    const query = this.accountTypeRepository.createQueryBuilder('account_type');

    if (since) {
      query.where('account_type.updated_at > :since', { since });
    } else {
      query.where('account_type.updated_sync_at IS NULL')
           .orWhere('account_type.updated_at > account_type.updated_sync_at');
    }

    const accountTypes = await query.getMany();

    return accountTypes.map(a => ({
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
