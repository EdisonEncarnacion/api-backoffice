import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { UpdateStockDto } from './stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async updateStock(dto: UpdateStockDto) {
    const product = await this.productRepo.findOne({
      where: { product_id: dto.product_id, id_local: dto.id_local },
    });
  
    if (!product) throw new Error('Producto no encontrado');
  
    (product as any).stock = dto.stock;
    return this.productRepo.save(product);
  }
// stock.service.ts
async findPendingStockSync(): Promise<{ product_id: number; stock: number; id_local: string }[]> {
    const pendingStocks = await this.productRepo
      .createQueryBuilder('p')
      .select([
        'p.product_id as product_id',
        'p.stock as stock',
        'p.id_local as id_local',
      ])
      .where('p.stock_updated_sync_at IS NULL OR p.updated_at > p.stock_updated_sync_at')
      .getRawMany();
  
    if (pendingStocks.length > 0) {
      await this.productRepo
        .createQueryBuilder()
        .update(Product)
        .set({ 
            stock_updated_sync_at: () => 'NOW()', 
            updated_sync_at: () => 'NOW()'
          })
        .where('stock_updated_sync_at IS NULL OR updated_at > stock_updated_sync_at')
        .execute();
    }
  
    return pendingStocks;
  }
  

  
}
