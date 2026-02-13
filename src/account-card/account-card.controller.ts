import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AccountCardService } from './account-card.service';

@Controller('sync')
export class AccountCardController {
  constructor(private readonly accountCardService: AccountCardService) { }

  @Get('account-card')
  async getAccountCards(
    @Query('since') since?: string,
    @Query('local_id') local_id?: string,
  ) {
    // local_id is optional:
    // - If provided: returns cards from tenant-specific accounts + global accounts (account.local_id NULL)
    // - If not provided: returns all cards (no local filter)
    return this.accountCardService.getAccountCardsForSync(since, local_id);
  }
}
