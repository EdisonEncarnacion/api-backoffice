import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('sync')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('product')
  async getProducts(@Query('since') since?: string) {
    return this.productService.getProductsForSync(since);
  }

  @Get('product/local')
  async getProductLocal(
    @Query('local_id') local_id: string,
    @Query('since') since?: string
  ) {
    return this.productService.getProductLocalForSync(local_id, since);
  }

  @Post('product/local')
  async postProductLocal(@Body() data: any[]) {
    return this.productService.saveProductLocalFromBranch(data);
  }
}
