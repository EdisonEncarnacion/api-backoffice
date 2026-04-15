import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { LocalPointsConfig } from './entities/local_points_config.entity';

@Injectable()
export class LocalPointsConfigService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getLocalPointsConfigForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const configRepo = dataSource.getRepository(LocalPointsConfig);

        const query = configRepo.createQueryBuilder('config');

        if (since) {
            query.where('config.updated_at > :since', { since });
        }

        const configs = await query.getMany();

        return configs.map((c) => ({
            id_local_points_config: c.id_local_points_config,
            points_per_sol: c.points_per_sol,
            is_active: c.is_active,
            created_at: c.created_at,
            updated_at: c.updated_at,
            state_audit: c.state_audit,
        }));
    }
}
