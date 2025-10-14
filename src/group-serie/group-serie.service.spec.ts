import { Test, TestingModule } from '@nestjs/testing';
import { GroupSerieService } from './group-serie.service';

describe('GroupSerieService', () => {
  let service: GroupSerieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSerieService],
    }).compile();

    service = module.get<GroupSerieService>(GroupSerieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
