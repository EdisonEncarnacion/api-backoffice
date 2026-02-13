import { Controller, Get, Query } from '@nestjs/common';
import { AccountProductService } from './account-product.service';

@Controller('sync')
export class AccountProductController {
  constructor(private readonly accountProductService: AccountProductService) { }

  @Get('account-product')
  async getAccountProducts(@Query('since') since?: string) {
    return this.accountProductService.getAccountProductsForSync(since);
  }
}
