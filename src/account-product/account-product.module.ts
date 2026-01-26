import { Module } from '@nestjs/common';
import { AccountProductService } from './account-product.service';
import { AccountProductController } from './account-product.controller';

@Module({
  controllers: [AccountProductController],
  providers: [AccountProductService],
})
export class AccountProductModule {}
