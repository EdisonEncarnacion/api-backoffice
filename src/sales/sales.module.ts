import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './sale.entity';
import { SaleDetail } from '../sale-details/sale-detail.entity';
import { UuidMapperService } from '../shared/uuid-mapper.service'; 
import { Payment } from '../payments/entities/payment.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleDetail, Payment])],
  controllers: [SalesController],
  providers: [SalesService, UuidMapperService],
})
export class SalesModule { }
