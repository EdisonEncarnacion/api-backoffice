import { Controller, Get, Query } from '@nestjs/common';
import { ReceiptConfigurationService } from './receipt-configuration.service';

@Controller('sync')
export class ReceiptConfigurationController {
    constructor(private readonly receiptConfigurationService: ReceiptConfigurationService) { }

    @Get('receipt-configuration')
    async getReceiptConfigurations(@Query('since') since?: string) {
        return this.receiptConfigurationService.getReceiptConfigurationsForSync(since);
    }
}
