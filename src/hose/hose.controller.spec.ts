import { Test, TestingModule } from '@nestjs/testing';
import { HoseController } from './hose.controller';
import { HoseService } from './hose.service';

describe('HoseController', () => {
  let controller: HoseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoseController],
      providers: [HoseService],
    }).compile();

    controller = module.get<HoseController>(HoseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
