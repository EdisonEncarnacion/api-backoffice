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
    if (!local_id) {
      throw new BadRequestException('local_id es requerido');
    }

    return this.accountCardService.getAccountCardsForSync(since, local_id);
  }
}
