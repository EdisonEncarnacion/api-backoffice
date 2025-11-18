import { Controller, Get, Query } from '@nestjs/common';
import { GroupSerieService } from './group-serie.service';

@Controller('sync')
export class GroupSerieController {
  constructor(private readonly groupSerieService: GroupSerieService) {}

  @Get('group-serie')
  async getGroupSeries(@Query('local_id') local_id: string) {
    return this.groupSerieService.getGroupSeriesByLocal(local_id);
  }
}
