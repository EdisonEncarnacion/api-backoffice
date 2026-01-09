import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepo: Repository<Role>,
    ) { }

    async getRolesForSync(since?: string) {
        const query = this.roleRepo.createQueryBuilder('role');

        if (since) {
            query.where('role.updated_at > :since', { since });
        }

        const roles = await query.getMany();

        return roles.map(r => ({
            id_role: r.id_role,
            name: r.name,
            description: r.description,
            created_at: r.created_at,
            updated_at: r.updated_at,
            state_audit: r.state_audit,
        }));
    }
}
