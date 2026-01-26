import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLocal } from './entities/product-local.entity';
import { ProductLocalService } from './product-local.service';
import { ProductLocalController } from './product-local.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductLocal])],
  controllers: [ProductLocalController],
  providers: [ProductLocalService],
})
export class ProductLocalModule {}
