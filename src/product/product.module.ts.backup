import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductLocal } from './entities/product-local.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductLocal])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
