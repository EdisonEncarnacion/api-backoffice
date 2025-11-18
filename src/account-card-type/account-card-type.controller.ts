import { Controller, Get, Query } from '@nestjs/common';
import { AccountCardTypeService } from './account-card-type.service';

@Controller('sync')
export class AccountCardTypeController {
  constructor(private readonly accountCardTypeService: AccountCardTypeService) {}

  @Get('account-card-type')
  async getAccountCardTypes(@Query('since') since?: string) {
    return this.accountCardTypeService.getAccountCardTypesForSync(since);
  }
}
