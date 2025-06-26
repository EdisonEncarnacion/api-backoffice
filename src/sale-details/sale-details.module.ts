import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleDetail } from './sale-detail.entity';
import { SaleDetailsService } from './sale-details.service';
import { SaleDetailsController } from './sale-details.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SaleDetail])],
  controllers: [SaleDetailsController],
  providers: [SaleDetailsService],
})
export class SaleDetailsModule { }
