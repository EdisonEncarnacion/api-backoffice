import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('sync/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() dto: any) {
    return this.productService.createOrUpdate(dto);
  }

 // 🔹 Nuevo: solo devuelve productos pendientes
 @Get()
 async findPendingSync() {
   return this.productService.findPendingSync();
 }


}