import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { ReportSection } from './entities/report-section.entity';

@Injectable()
export class ReportSectionService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getReportSectionsForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const reportSectionRepo = dataSource.getRepository(ReportSection);

        const query = reportSectionRepo.createQueryBuilder('report_section');

        if (since) {
            query.where('report_section.updated_at > :since', { since });
        }

        const reportSections = await query.getMany();

        return reportSections.map((rs) => ({
            id_report_sections: rs.id_report_sections,
            id_report: rs.id_report,
            id_section: rs.id_section,
            active: rs.active,
            order: rs.order,
            created_at: rs.created_at,
            updated_at: rs.updated_at,
            state_audit: rs.state_audit,
        }));
    }
}
