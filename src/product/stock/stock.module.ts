import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Product } from '../entities/product.entity';
import { UuidMapperService } from '../../shared/uuid-mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [StockService, UuidMapperService],
  controllers: [StockController],
})
export class StockModule {}
