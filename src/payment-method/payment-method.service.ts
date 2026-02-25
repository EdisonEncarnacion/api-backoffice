import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { PaymentMethod } from './entities/payment-method.entity';

@Injectable()
export class PaymentMethodService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getPaymentMethodsForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const paymentMethodRepo = dataSource.getRepository(PaymentMethod);

        const query = paymentMethodRepo.createQueryBuilder('payment_method');

        if (since) {
            query.where('payment_method.updated_at > :since', { since });
        }

        const paymentMethods = await query.getMany();

        return paymentMethods.map((pm) => ({
            id_payment_method: pm.id_payment_method,
            name: pm.name,
            description: pm.description,
            payment_code: pm.payment_code,
            is_active: pm.is_active,
            code_component: pm.code_component,
            created_at: pm.created_at,
            updated_at: pm.updated_at,
            state_audit: pm.state_audit,
        }));
    }
}
