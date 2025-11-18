import { Controller, Get, Query } from '@nestjs/common';
import { AccountTypeService } from './account-type.service';

@Controller('sync')
export class AccountTypeController {
  constructor(private readonly accountTypeService: AccountTypeService) {}

  @Get('account-type')
  async getAccountTypes(@Query('since') since?: string) {
    return this.accountTypeService.getAccountTypesForSync(since);
  }
}
