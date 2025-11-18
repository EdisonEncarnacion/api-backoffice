import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, IsNull } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductLocal } from './entities/product-local.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductLocal)
    private readonly productLocalRepository: Repository<ProductLocal>,
  ) {}

  async getProductsForSync(since?: string) {
    const query = this.productRepository.createQueryBuilder('p');
    if (since) {
      query.where('p.updated_at > :since', { since });
    } else {
      query.where('p.updated_sync_at IS NULL OR p.updated_at > p.updated_sync_at');
    }
    return await query.getMany();
  }

  async getProductLocalForSync(local_id: string, since?: string) {
    const query = this.productLocalRepository.createQueryBuilder('pl')
      .innerJoinAndSelect('product', 'p', 'p.product_id = pl.product_id')
      .where('pl.id_local = :local_id', { local_id });

    if (since) query.andWhere('pl.updated_at > :since', { since });

    const result = await query.getRawMany();

    return result.map(r => ({
      product_local_id: r.pl_product_local_id,
      product_id: r.p_product_id,
      description: r.p_description,
      product_code: r.p_product_code,
      id_local: local_id,
      stock: Number(r.pl_stock ?? 0),
      price: Number(r.pl_price ?? 0),
      manage_stock: r.pl_manage_stock ?? false,
      updated_at: r.pl_updated_at,
      created_at: r.pl_created_at,
    }));
  }

  async saveProductLocalFromBranch(data: any[]) {
    for (const item of data) {
      const existing = await this.productLocalRepository.findOne({
        where: { product_id: item.product_id, id_local: item.id_local },
      });

      if (existing) {
        Object.assign(existing, {
          stock: item.stock,
          price: item.price,
          manage_stock: item.manage_stock,
          updated_at: new Date(),
        });
        await this.productLocalRepository.save(existing);
      } else {
        const newRecord = this.productLocalRepository.create({
          product_id: item.product_id,
          id_local: item.id_local,
          stock: item.stock,
          price: item.price,
          manage_stock: item.manage_stock,
          created_at: new Date(),
          updated_at: new Date(),
          state_audit: 'A',
        });
        await this.productLocalRepository.save(newRecord);
      }
    }

    return { message: `${data.length} productos locales sincronizados desde Ventas` };
  }
}
