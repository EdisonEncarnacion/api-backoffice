import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Discount } from './entities/discount.entity';

@Injectable()
export class DiscountService {
  constructor(private readonly tenantConnection: TenantConnectionProvider) {}

  async getDiscountsForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const discountRepo = dataSource.getRepository(Discount);

    const query = discountRepo.createQueryBuilder('discount');

    // Solo sincronizar registros que tengan id_local (para ventas)
    query.where('discount.id_local IS NOT NULL');

    if (since) {
      query.andWhere('discount.updated_at > :since', { since });
    }

    const discounts = await query.getMany();

    // Mapear solo los campos que existen en ventas (excluir created_by y updated_by)
    return discounts.map((d) => ({
      id_discount: d.id_discount,
      id_local: d.id_local,
      assignment_type: d.assignment_type,
      discount_type_id: d.discount_type_id,
      id_client: d.id_client,
      id_group: d.id_group,
      id_product: d.id_product,
      min_quantity: d.min_quantity,
      amount: d.amount,
      created_at: d.created_at,
      updated_at: d.updated_at,
      state_audit: d.state_audit,
    }));
  }
}
