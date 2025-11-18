import { Controller, Get, Query } from '@nestjs/common';
import { SideService } from './side.service';

@Controller('sync')
export class SideController {
  constructor(private readonly sideService: SideService) {}

  @Get('side')
  async getSides(@Query('local_id') local_id: string) {
    return this.sideService.getSidesByLocal(local_id);
  }
}
