import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('sync')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Get('report')
    async getReports(@Query('since') since?: string) {
        return this.reportService.getReportsForSync(since);
    }
}
