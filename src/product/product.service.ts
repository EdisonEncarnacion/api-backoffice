import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Product } from './entities/product.entity';
import { ProductLocal } from './entities/product-local.entity';

@Injectable()
export class ProductService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getProductsForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const productRepository = dataSource.getRepository(Product);

    const query = productRepository.createQueryBuilder('p');
    if (since) {
      query.where('p.updated_at > :since', { since });
    }
    return await query.getMany();
  }

  async getProductLocalForSync(local_id: string, since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const productLocalRepository = dataSource.getRepository(ProductLocal);

    const query = productLocalRepository
      .createQueryBuilder('pl')
      .innerJoinAndSelect('product', 'p', 'p.product_id = pl.product_id')
      .where('pl.id_local = :local_id', { local_id });

    if (since) query.andWhere('pl.updated_at > :since', { since });

    const result = await query.getRawMany();

    return result.map((r) => ({
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
    const dataSource = await this.tenantConnection.getDataSource();
    const productLocalRepository = dataSource.getRepository(ProductLocal);

    for (const item of data) {
      const existing = await productLocalRepository.findOne({
        where: { product_id: item.product_id, id_local: item.id_local },
      });

      if (existing) {
        Object.assign(existing, {
          stock: item.stock,
          price: item.price,
          manage_stock: item.manage_stock,
          updated_at: new Date(),
        });
        await productLocalRepository.save(existing);
      } else {
        const newRecord = productLocalRepository.create({
          product_id: item.product_id,
          id_local: item.id_local,
          stock: item.stock,
          price: item.price,
          manage_stock: item.manage_stock,
          created_at: new Date(),
          updated_at: new Date(),
          state_audit: 'A',
        });
        await productLocalRepository.save(newRecord);
      }
    }

    return { message: `${data.length} productos locales sincronizados desde Ventas` };
  }
}

