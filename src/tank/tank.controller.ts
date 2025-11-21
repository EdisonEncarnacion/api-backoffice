import { Controller, Get, Query } from '@nestjs/common';
import { TankService } from './tank.service';

@Controller('sync')
export class TankController {
  constructor(private readonly tankService: TankService) {}

  @Get('tank')
  async getTanks(
    @Query('since') since?: string,
    @Query('local_id') local_id?: string,
  ) {
    return this.tankService.getTanksForSync(since, local_id);
  }
}
