import { Module } from '@nestjs/common';
import { TenantModule } from '../tenant/tenant.module';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';

@Module({
    imports: [TenantModule],
    controllers: [ReportController],
    providers: [ReportService],
    exports: [ReportService],
})
export class ReportModule { }
