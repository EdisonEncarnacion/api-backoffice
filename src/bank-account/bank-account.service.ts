import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from './entities/bank-account.entity';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepo: Repository<BankAccount>,
  ) {}

  async getBankAccountsForSync(since?: string) {
    const query = this.bankAccountRepo.createQueryBuilder('bank_account');

    if (since) {
      query.where('bank_account.updated_at > :since', { since });
    }

    const accounts = await query.getMany();

    return accounts.map(a => ({
      id_bank_account: a.id_bank_account,
      account_number: a.account_number,
      code: a.code,
      holder_name: a.holder_name,
      description: a.description,
      bank_id: a.bank_id,
      currency_id: a.currency_id,
      local_id: a.local_id,
      type: a.type,
      cci: a.cci,
      accounting_account: a.accounting_account,
      use_in_payments: a.use_in_payments,
      use_in_retentions: a.use_in_retentions,
      use_in_transfers: a.use_in_transfers,
      active: a.active,
      balance: a.balance,
      metadata: a.metadata,
      created_at: a.created_at,
      updated_at: a.updated_at,
      state_audit: a.state_audit,
    }));
  }
}
