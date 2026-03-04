import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { PaymentMethodType } from './entities/payment-method-type.entity';

@Injectable()
export class PaymentMethodTypeService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getPaymentMethodTypesForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const paymentMethodTypeRepo = dataSource.getRepository(PaymentMethodType);

        const query = paymentMethodTypeRepo.createQueryBuilder('payment_method_type');

        if (since) {
            query.where('payment_method_type.updated_at > :since', { since });
        }

        const paymentMethodTypes = await query.getMany();

        return paymentMethodTypes.map((pmt) => ({
            id_payment_method_type: pmt.id_payment_method_type,
            name: pmt.name,
            short_name: pmt.short_name,
            is_active: pmt.is_active,
            payment_method_id: pmt.payment_method_id,
            created_at: pmt.created_at,
            updated_at: pmt.updated_at,
        }));
    }
}
