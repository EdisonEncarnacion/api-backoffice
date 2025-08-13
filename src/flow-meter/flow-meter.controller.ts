import { Controller, Post, Get, Body } from '@nestjs/common';
import { FlowMeterService } from './flow-meter.service';
import { CreateFlowMeterDto } from './dto/create-flow-meter.dto';

@Controller('sync/flow-meter') 
export class FlowMeterController {
  constructor(private readonly service: FlowMeterService) {}



  @Post()
  async create(@Body() dto: CreateFlowMeterDto) {
    return this.service.create(dto);
  }
}
