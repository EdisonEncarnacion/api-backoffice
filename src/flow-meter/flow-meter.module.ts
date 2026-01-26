import { Module } from '@nestjs/common';
import { FlowMeterService } from './flow-meter.service';
import { FlowMeterController } from './flow-meter.controller';
import { UuidMapperService } from '../shared/uuid-mapper.service';

@Module({
  controllers: [FlowMeterController],
  providers: [FlowMeterService, UuidMapperService],
})
export class FlowMeterModule {}
