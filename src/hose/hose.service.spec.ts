import { Test, TestingModule } from '@nestjs/testing';
import { HoseService } from './hose.service';

describe('HoseService', () => {
  let service: HoseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoseService],
    }).compile();

    service = module.get<HoseService>(HoseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
