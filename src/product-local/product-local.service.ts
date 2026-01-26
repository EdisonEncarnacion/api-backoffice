import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { ProductLocal } from './entities/product-local.entity';

@Injectable()
export class ProductLocalService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getProductsForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const productLocalRepository = dataSource.getRepository(ProductLocal);

    const query = productLocalRepository.createQueryBuilder('product_local');

    if (since) {
      query.where('product_local.updated_at > :since', { since });
    } else {
      query.orderBy('product_local.updated_at', 'DESC');
    }

    const products = await query.getMany();

    return products.map((p) => ({
      product_local_id: p.product_local_id,
      product_id: p.product_id,
      id_local: p.id_local,
      stock: p.stock,
      manage_stock: p.manage_stock,
      price: p.price,
      created_at: p.created_at,
      updated_at: p.updated_at,
      state_audit: p.state_audit,
    }));
  }

  async saveOrUpdateProductLocal(dto: ProductLocal) {
    try {
      const dataSource = await this.tenantConnection.getDataSource();
      const productLocalRepository = dataSource.getRepository(ProductLocal);

      let productLocal = await productLocalRepository.findOne({
        where: { product_id: dto.product_id, id_local: dto.id_local },
      });

      if (productLocal) {
        Object.assign(productLocal, dto, {
          updated_at: new Date(),
        });
        return await productLocalRepository.save(productLocal);
      }

      const newProductLocal = productLocalRepository.create({
        ...dto,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return await productLocalRepository.save(newProductLocal);
    } catch (err: any) {
      throw new Error(`Error guardando product_local: ${err.message}`);
    }
  }
}

