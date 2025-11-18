import { Test, TestingModule } from '@nestjs/testing';
import { AccountProductController } from './account-product.controller';
import { AccountProductService } from './account-product.service';

describe('AccountProductController', () => {
  let controller: AccountProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountProductController],
      providers: [AccountProductService],
    }).compile();

    controller = module.get<AccountProductController>(AccountProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
