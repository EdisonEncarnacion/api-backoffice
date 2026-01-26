import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowMeterService } from './flow-meter.service';
import { FlowMeterController } from './flow-meter.controller';
import { FlowMeter } from './entities/flow-meter.entity';
import { UuidMapperService } from '../shared/uuid-mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([FlowMeter])],
  controllers: [FlowMeterController],
  providers: [FlowMeterService, UuidMapperService],
})
export class FlowMeterModule {}
