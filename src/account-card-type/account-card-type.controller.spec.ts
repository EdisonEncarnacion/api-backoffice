import { Test, TestingModule } from '@nestjs/testing';
import { AccountCardTypeController } from './account-card-type.controller';
import { AccountCardTypeService } from './account-card-type.service';

describe('AccountCardTypeController', () => {
  let controller: AccountCardTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountCardTypeController],
      providers: [AccountCardTypeService],
    }).compile();

    controller = module.get<AccountCardTypeController>(AccountCardTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
