import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';

@Module({
  imports: [],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}
