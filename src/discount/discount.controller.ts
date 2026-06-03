import { Controller, Get, Query } from '@nestjs/common';
import { DiscountService } from './discount.service';

@Controller('sync')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get('discount')
  async getDiscounts(@Query('since') since?: string) {
    return this.discountService.getDiscountsForSync(since);
  }
}
