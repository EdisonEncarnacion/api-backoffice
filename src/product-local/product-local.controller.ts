import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductLocalService } from './product-local.service';
import { ProductLocal } from './entities/product-local.entity';

@Controller('sync')
export class ProductLocalController {
  constructor(private readonly productLocalService: ProductLocalService) {}

  @Get('product-local')
  async getProductLocal(@Query('since') since?: string) {
    return this.productLocalService.getProductsForSync(since);
  }

  @Post('product-local')
  async saveOrUpdateProductLocal(@Body() dto: ProductLocal) {
    return this.productLocalService.saveOrUpdateProductLocal(dto);
  }
}
