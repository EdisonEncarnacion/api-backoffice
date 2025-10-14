import { Test, TestingModule } from '@nestjs/testing';
import { TransactionControllerService } from './transaction-controller.service';

describe('TransactionControllerService', () => {
  let service: TransactionControllerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionControllerService],
    }).compile();

    service = module.get<TransactionControllerService>(TransactionControllerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
