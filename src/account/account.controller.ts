import { Controller, Get, Query } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('sync')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('account')
  async getAccounts(@Query('since') since?: string) {
    return this.accountService.getAccountsForSync(since);
  }
}
