import { Test, TestingModule } from '@nestjs/testing';
import { GeneralTypeController } from './general-type.controller';
import { GeneralTypeService } from './general-type.service';

describe('GeneralTypeController', () => {
  let controller: GeneralTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralTypeController],
      providers: [GeneralTypeService],
    }).compile();

    controller = module.get<GeneralTypeController>(GeneralTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
