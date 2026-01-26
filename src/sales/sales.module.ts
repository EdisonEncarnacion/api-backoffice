import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { UuidMapperService } from '../shared/uuid-mapper.service';

@Module({
  imports: [],
  controllers: [SalesController],
  providers: [SalesService, UuidMapperService],
})
export class SalesModule { }
