// src/side/side.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { SideService } from './side.service';

@Controller('sync/side')
export class SideController {
  constructor(private readonly sideService: SideService) {}

  @Get()
  async getSides(@Query('local_id') localId: string) {
    return await this.sideService.getSidesByLocal(localId);
  }
}
