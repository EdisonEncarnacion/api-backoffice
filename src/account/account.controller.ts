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
    if (!local_id) {
      throw new BadRequestException('local_id es requerido');
    }

    return this.accountService.getAccountsForSync(since, local_id);
  }
}
