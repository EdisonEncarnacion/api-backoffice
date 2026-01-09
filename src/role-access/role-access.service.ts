import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleAccess } from './entities/role-access.entity';

@Injectable()
export class RoleAccessService {
    constructor(
        @InjectRepository(RoleAccess)
        private readonly roleAccessRepo: Repository<RoleAccess>,
    ) { }

    async getRoleAccessForSync(since?: string) {
        const query = this.roleAccessRepo.createQueryBuilder('role_access')
            .innerJoin('module', 'module', 'module.id_module = role_access.moduleId')
            .where('module.system_id = :systemId', { systemId: 2 });

        if (since) {
            query.andWhere('role_access.updated_at > :since', { since });
        }

        const roleAccess = await query.getMany();

        return roleAccess.map(ra => ({
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
