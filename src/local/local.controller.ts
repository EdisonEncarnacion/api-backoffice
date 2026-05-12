import { Controller, Get, Query } from '@nestjs/common';
import { LocalService } from './local.service';

@Controller('sync')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Get('local')
  async getLocals(@Query('since') since?: string) {
    return this.localService.getLocalsForSync(since);
  }
}
