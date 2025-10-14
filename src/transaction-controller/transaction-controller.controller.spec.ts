import { Test, TestingModule } from '@nestjs/testing';
import { TransactionControllerController } from './transaction-controller.controller';
import { TransactionControllerService } from './transaction-controller.service';

describe('TransactionControllerController', () => {
  let controller: TransactionControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionControllerController],
      providers: [TransactionControllerService],
    }).compile();

    controller = module.get<TransactionControllerController>(TransactionControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
