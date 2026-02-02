import { Controller, Get, Query } from '@nestjs/common';
import { WorkShiftService } from './work-shift.service';

@Controller('sync')
export class WorkShiftController {
    constructor(private readonly workShiftService: WorkShiftService) { }

    @Get('work-shift')
    async getWorkShifts(@Query('since') since?: string) {
        return this.workShiftService.getWorkShiftsForSync(since);
    }
}
