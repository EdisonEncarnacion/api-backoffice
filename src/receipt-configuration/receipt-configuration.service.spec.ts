import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptConfigurationService } from './receipt-configuration.service';

describe('ReceiptConfigurationService', () => {
    let service: ReceiptConfigurationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReceiptConfigurationService],
        }).compile();

        service = module.get<ReceiptConfigurationService>(ReceiptConfigurationService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
