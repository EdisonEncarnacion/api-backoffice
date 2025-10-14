import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}
  async createOrUpdate(dto: CreateProductDto): Promise<Product> { 
    const existing = await this.repo.findOneBy({ product_id: dto.product_id });
  
    if (existing) {
      Object.assign(existing, {
        ...dto,
        // ❌ No toques updated_at aquí, viene desde Backoffice
        updated_sync_at: new Date(),  
      });
      return this.repo.save(existing);
    }
  
    const product = this.repo.create({
      ...dto,
      created_at: new Date(),
      updated_at: dto.updated_at || new Date(), 
      updated_sync_at: new Date(),
    });
    return this.repo.save(product);
  }
  
  
  async findPendingSync(): Promise<Product[]> {
    return await this.repo
      .createQueryBuilder('p')
      .where('p.updated_sync_at IS NULL OR p.updated_at > p.updated_sync_at')
      .getMany();
  }
  
 
}
