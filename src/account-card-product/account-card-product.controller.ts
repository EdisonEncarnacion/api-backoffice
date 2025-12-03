import { Controller, Get, Query } from '@nestjs/common';
import { AccountCardProductService } from './account-card-product.service';

@Controller('sync')
export class AccountCardProductController {
  constructor(private readonly service: AccountCardProductService) {}

  @Get('account-card-product')
  async getForSync(@Query('since') since?: string) {
    return this.service.getAccountCardProductsForSync(since);
  }
}


