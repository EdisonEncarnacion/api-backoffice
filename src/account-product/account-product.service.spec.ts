import { Test, TestingModule } from '@nestjs/testing';
import { AccountProductService } from './account-product.service';

describe('AccountProductService', () => {
  let service: AccountProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountProductService],
    }).compile();

    service = module.get<AccountProductService>(AccountProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
