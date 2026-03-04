import { Module } from '@nestjs/common';
import { TenantModule } from '../tenant/tenant.module';
import { ReportSectionService } from './report-section.service';
import { ReportSectionController } from './report-section.controller';

@Module({
    imports: [TenantModule],
    controllers: [ReportSectionController],
    providers: [ReportSectionService],
    exports: [ReportSectionService],
})
export class ReportSectionModule { }
