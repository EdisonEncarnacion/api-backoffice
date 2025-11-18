import { Test, TestingModule } from '@nestjs/testing';
import { AccountTypeController } from './account-type.controller';
import { AccountTypeService } from './account-type.service';

describe('AccountTypeController', () => {
  let controller: AccountTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountTypeController],
      providers: [AccountTypeService],
    }).compile();

    controller = module.get<AccountTypeController>(AccountTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
