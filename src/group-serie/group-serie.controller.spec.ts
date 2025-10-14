import { Test, TestingModule } from '@nestjs/testing';
import { GroupSerieController } from './group-serie.controller';
import { GroupSerieService } from './group-serie.service';

describe('GroupSerieController', () => {
  let controller: GroupSerieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupSerieController],
      providers: [GroupSerieService],
    }).compile();

    controller = module.get<GroupSerieController>(GroupSerieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
