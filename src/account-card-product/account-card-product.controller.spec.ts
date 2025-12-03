import { Test, TestingModule } from '@nestjs/testing';
import { AccountCardProductController } from './account-card-product.controller';
import { AccountCardProductService } from './account-card-product.service';

describe('AccountCardProductController', () => {
  let controller: AccountCardProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountCardProductController],
      providers: [AccountCardProductService],
    }).compile();

    controller = module.get<AccountCardProductController>(AccountCardProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
