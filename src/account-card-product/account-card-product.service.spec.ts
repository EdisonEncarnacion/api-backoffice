import { Test, TestingModule } from '@nestjs/testing';
import { AccountCardProductService } from './account-card-product.service';

describe('AccountCardProductService', () => {
  let service: AccountCardProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountCardProductService],
    }).compile();

    service = module.get<AccountCardProductService>(AccountCardProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
