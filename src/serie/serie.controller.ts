import { Controller, Get, Query } from '@nestjs/common';
import { SerieService } from './serie.service';

@Controller('sync')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  // 🔹 GET Series por local
  @Get('serie')
  async getSeries(@Query('local_id') local_id: string) {
    return this.serieService.getSeriesByLocal(local_id);
  }
}
