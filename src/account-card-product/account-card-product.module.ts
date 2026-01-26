import { Module } from '@nestjs/common';
import { AccountCardProductService } from './account-card-product.service';
import { AccountCardProductController } from './account-card-product.controller';

@Module({
  controllers: [AccountCardProductController],
  providers: [AccountCardProductService],
})
export class AccountCardProductModule {}
