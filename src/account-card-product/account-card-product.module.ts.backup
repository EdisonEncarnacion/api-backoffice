import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountCardProduct } from './entities/account-card-product.entity';
import { AccountCardProductService } from './account-card-product.service';
import { AccountCardProductController } from './account-card-product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountCardProduct])],
  controllers: [AccountCardProductController],
  providers: [AccountCardProductService],
})
export class AccountCardProductModule {}
