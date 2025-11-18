import { Test, TestingModule } from '@nestjs/testing';
import { AccountCardController } from './account-card.controller';
import { AccountCardService } from './account-card.service';

describe('AccountCardController', () => {
  let controller: AccountCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountCardController],
      providers: [AccountCardService],
    }).compile();

    controller = module.get<AccountCardController>(AccountCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
