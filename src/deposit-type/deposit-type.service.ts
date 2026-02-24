import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { DepositType } from './entities/deposit-type.entity';

@Injectable()
export class DepositTypeService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getDepositTypesForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const depositTypeRepo = dataSource.getRepository(DepositType);

        const query = depositTypeRepo.createQueryBuilder('deposit_type');

        if (since) {
            query.where('deposit_type.updated_at > :since', { since });
        }

        const depositTypes = await query.getMany();

        return depositTypes.map((dt) => ({
            code_deposit_type: dt.code_deposit_type,
            description: dt.description,
            movement_type: dt.movement_type,
            created_at: dt.created_at,
            updated_at: dt.updated_at,
            state_audit: dt.state_audit,
        }));
    }
}
