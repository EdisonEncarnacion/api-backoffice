import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { ReceiptConfiguration } from './entities/receipt-configuration.entity';

@Injectable()
export class ReceiptConfigurationService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getReceiptConfigurationsForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const receiptConfigRepo = dataSource.getRepository(ReceiptConfiguration);
        const query = receiptConfigRepo.createQueryBuilder('receipt_configuration');

        if (since) {
            query.where('receipt_configuration.updated_at > :since', { since });
        }

        const configurations = await query.getMany();

        return configurations.map((rc) => ({
            id_receipt_configuration: rc.id_receipt_configuration,
            schedule_interval: rc.schedule_interval,
            is_active: rc.is_active,
            id_sale_document_type: rc.id_sale_document_type,
            id_client: rc.id_client,
            created_by: rc.created_by,
            created_at: rc.created_at,
            updated_at: rc.updated_at,
            notes: rc.notes,
            id_local: rc.id_local,
            max_amount: rc.max_amount,
            max_amount_client: rc.max_amount_client,
            type: rc.type,
        }));
    }
}
