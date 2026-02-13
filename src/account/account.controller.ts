import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('sync')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Get('account')
  async getAccounts(
    @Query('since') since?: string,
    @Query('local_id') local_id?: string,
  ) {
    // local_id is optional:
    // - If provided: returns tenant-specific accounts + global accounts (local_id NULL)
    // - If not provided: returns all accounts (no local filter)
    return this.accountService.getAccountsForSync(since, local_id);
  }
}
