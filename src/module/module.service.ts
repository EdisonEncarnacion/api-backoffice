import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Module } from './entities/module.entity';

@Injectable()
export class ModuleService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getModulesForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const moduleRepo = dataSource.getRepository(Module);

        const query = moduleRepo.createQueryBuilder('module');


        if (since) {
            query.where('module.updated_at > :since', { since });
        }

        const modules = await query.getMany();

        return modules.map((m) => ({
            id_module: m.id_module,
            name: m.name,
            description: m.description,
            created_at: m.created_at,
            updated_at: m.updated_at,
            state_audit: m.state_audit,
        }));
    }
}

