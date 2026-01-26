import { Module } from '@nestjs/common';
import { ReceiptConfigurationService } from './receipt-configuration.service';
import { ReceiptConfigurationController } from './receipt-configuration.controller';

@Module({
    controllers: [ReceiptConfigurationController],
    providers: [ReceiptConfigurationService],
})
export class ReceiptConfigurationModule { }
