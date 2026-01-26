import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getRolesForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const roleRepo = dataSource.getRepository(Role);

        const query = roleRepo.createQueryBuilder('role');

        if (since) {
            query.where('role.updated_at > :since', { since });
        }

        const roles = await query.getMany();

        return roles.map((r) => ({
            id_role: r.id_role,
            name: r.name,
            description: r.description,
            created_at: r.created_at,
            updated_at: r.updated_at,
            state_audit: r.state_audit,
        }));
    }
}
