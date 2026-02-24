import { Controller, Get, Query } from '@nestjs/common';
import { DepositTypeService } from './deposit-type.service';

@Controller('sync')
export class DepositTypeController {
    constructor(private readonly depositTypeService: DepositTypeService) { }

    @Get('deposit-type')
    async getDepositTypes(@Query('since') since?: string) {
        return this.depositTypeService.getDepositTypesForSync(since);
    }
}
