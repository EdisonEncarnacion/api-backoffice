import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { RoleAccess } from './entities/role-access.entity';

@Injectable()
export class RoleAccessService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getRoleAccessForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const roleAccessRepo = dataSource.getRepository(RoleAccess);

        const query = roleAccessRepo
            .createQueryBuilder('role_access')
            .innerJoin('module', 'module', 'module.id_module = role_access.moduleId')
            .where('module.system_id = :systemId', { systemId: 2 });

        if (since) {
            query.andWhere('role_access.updated_at > :since', { since });
        }

        const roleAccess = await query.getMany();

        return roleAccess.map((ra) => ({
            id_role_access: ra.id_role_access,
            created_at: ra.created_at,
            updated_at: ra.updated_at,
            state_audit: ra.state_audit,
            roleId: ra.roleId,
            moduleId: ra.moduleId,
            permissionId: ra.permissionId,
        }));
    }
}
