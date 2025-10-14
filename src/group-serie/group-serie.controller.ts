import { Controller, Get, Param, Patch, Body, Query } from '@nestjs/common';
import { GroupSerieService } from './group-serie.service';
import { GroupSerie } from './entities/group-serie.entity';

@Controller('group-serie')
export class GroupSerieController {
  constructor(private readonly groupSerieService: GroupSerieService) {}

  @Get()
  async findAll(): Promise<GroupSerie[]> {
    return await this.groupSerieService.findAll();
  }

@Get('pending-sync')
async findPendingSync(@Query('local_id') localId?: string): Promise<GroupSerie[]> {
  return await this.groupSerieService.findPendingSync(localId);
}


  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GroupSerie> {
    return await this.groupSerieService.findOne(id);
  }


  @Patch(':id')
  async updateSyncAt(
    @Param('id') id: string,
    @Body() body: { updated_sync_at: string }
  ): Promise<GroupSerie> {
    return await this.groupSerieService.updateSyncAt(id, body.updated_sync_at);
  }
}
