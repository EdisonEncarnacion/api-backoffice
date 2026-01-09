import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Module } from './entities/module.entity';

@Injectable()
export class ModuleService {
    constructor(
        @InjectRepository(Module)
        private readonly moduleRepo: Repository<Module>,
    ) { }

    async getModulesForSync(since?: string) {
        const query = this.moduleRepo.createQueryBuilder('module');

        // Solo enviar módulos con system_id = 2 (ventas)
        // system_id = 1 pertenece a backoffice y no se sincroniza
        query.where('module.system_id = :systemId', { systemId: 2 });

        if (since) {
            query.andWhere('module.updated_at > :since', { since });
        }

        const modules = await query.getMany();

        return modules.map(m => ({
            id_module: m.id_module,
            name: m.name,
            system_id: m.system_id,
            description: m.description,
            created_at: m.created_at,
            updated_at: m.updated_at,
            state_audit: m.state_audit,
        }));
    }
}
