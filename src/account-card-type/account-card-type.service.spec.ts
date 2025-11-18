import { Test, TestingModule } from '@nestjs/testing';
import { AccountCardTypeService } from './account-card-type.service';

describe('AccountCardTypeService', () => {
  let service: AccountCardTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountCardTypeService],
    }).compile();

    service = module.get<AccountCardTypeService>(AccountCardTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
