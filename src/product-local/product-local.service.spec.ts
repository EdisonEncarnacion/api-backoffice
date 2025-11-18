import { Test, TestingModule } from '@nestjs/testing';
import { ProductLocalService } from './product-local.service';

describe('ProductLocalService', () => {
  let service: ProductLocalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductLocalService],
    }).compile();

    service = module.get<ProductLocalService>(ProductLocalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
