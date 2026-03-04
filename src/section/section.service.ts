import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getSectionsForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const sectionRepo = dataSource.getRepository(Section);

        const query = sectionRepo.createQueryBuilder('section');

        if (since) {
            query.where('section.updated_at > :since', { since });
        }

        const sections = await query.getMany();

        return sections.map((s) => ({
            id_section: s.id_section,
            code: s.code,
            name_section: s.name_section,
            fields: s.fields,
            created_at: s.created_at,
            updated_at: s.updated_at,
            state_audit: s.state_audit,
        }));
    }
}
