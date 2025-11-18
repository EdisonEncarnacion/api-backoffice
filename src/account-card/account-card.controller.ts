import { Controller, Get, Query } from '@nestjs/common';
import { AccountCardService } from './account-card.service';

@Controller('sync')
export class AccountCardController {
  constructor(private readonly accountCardService: AccountCardService) {}

  @Get('account-card')
  async getAccountCards(@Query('since') since?: string) {
    return this.accountCardService.getAccountCardsForSync(since);
  }
}
