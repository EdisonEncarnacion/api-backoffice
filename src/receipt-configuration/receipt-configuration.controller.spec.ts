import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptConfigurationController } from './receipt-configuration.controller';
import { ReceiptConfigurationService } from './receipt-configuration.service';

describe('ReceiptConfigurationController', () => {
    let controller: ReceiptConfigurationController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReceiptConfigurationController],
            providers: [ReceiptConfigurationService],
        }).compile();

        controller = module.get<ReceiptConfigurationController>(ReceiptConfigurationController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
