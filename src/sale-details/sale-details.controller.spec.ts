import { Test, TestingModule } from '@nestjs/testing';
import { SaleDetailsController } from './sale-details.controller';

describe('SaleDetailsController', () => {
  let controller: SaleDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleDetailsController],
    }).compile();

    controller = module.get<SaleDetailsController>(SaleDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
