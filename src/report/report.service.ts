import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getReportsForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const reportRepo = dataSource.getRepository(Report);

        const query = reportRepo.createQueryBuilder('report');

        if (since) {
            query.where('report.updated_at > :since', { since });
        }

        const reports = await query.getMany();

        return reports.map((r) => ({
            id_report: r.id_report,
            code: r.code,
            name_report: r.name_report,
            created_at: r.created_at,
            updated_at: r.updated_at,
            state_audit: r.state_audit,
        }));
    }
}
