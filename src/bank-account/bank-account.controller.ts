import { Controller, Get, Query } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';

@Controller('sync')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Get('bank-account')
  async getBankAccounts(@Query('since') since?: string) {
    return this.bankAccountService.getBankAccountsForSync(since);
  }
}
