import { Test, TestingModule } from '@nestjs/testing';
import { ProductLocalController } from './product-local.controller';
import { ProductLocalService } from './product-local.service';

describe('ProductLocalController', () => {
  let controller: ProductLocalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductLocalController],
      providers: [ProductLocalService],
    }).compile();

    controller = module.get<ProductLocalController>(ProductLocalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
