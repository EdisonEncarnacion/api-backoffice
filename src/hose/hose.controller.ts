import { Controller, Get, Query } from '@nestjs/common';
import { HoseService } from './hose.service';

@Controller('sync')
export class HoseController {
  constructor(private readonly service: HoseService) {}

  @Get('hose')
  async getForSync(@Query('since') since?: string) {
    return this.service.getHosesForSync(since);
  }
}
