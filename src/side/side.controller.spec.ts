import { Test, TestingModule } from '@nestjs/testing';
import { SideController } from './side.controller';

describe('SideController', () => {
  let controller: SideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SideController],
    }).compile();

    controller = module.get<SideController>(SideController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
