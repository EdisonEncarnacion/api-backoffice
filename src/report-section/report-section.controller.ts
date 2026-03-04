import { Controller, Get, Query } from '@nestjs/common';
import { ReportSectionService } from './report-section.service';

@Controller('sync')
export class ReportSectionController {
    constructor(private readonly reportSectionService: ReportSectionService) { }

    @Get('report-section')
    async getReportSections(@Query('since') since?: string) {
        return this.reportSectionService.getReportSectionsForSync(since);
    }
}
