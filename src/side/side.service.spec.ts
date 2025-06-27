import { Test, TestingModule } from '@nestjs/testing';
import { SideService } from './side.service';

describe('SideService', () => {
  let service: SideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SideService],
    }).compile();

    service = module.get<SideService>(SideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
