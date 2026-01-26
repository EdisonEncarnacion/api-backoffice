import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountProduct } from './entities/account-product.entity';
import { AccountProductService } from './account-product.service';
import { AccountProductController } from './account-product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountProduct])],
  controllers: [AccountProductController],
  providers: [AccountProductService],
})
export class AccountProductModule {}
