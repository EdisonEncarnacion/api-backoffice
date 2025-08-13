import { Test, TestingModule } from '@nestjs/testing';
import { GeneralTypeService } from './general-type.service';

describe('GeneralTypeService', () => {
  let service: GeneralTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralTypeService],
    }).compile();

    service = module.get<GeneralTypeService>(GeneralTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
