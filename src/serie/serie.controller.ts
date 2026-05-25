import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SerieService } from './serie.service';
import { UpdateCorrelativeDto } from './dto/update-correlative.dto';

@Controller('sync')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  /**
   * GET /sync/serie?local_id=xxx
   * Ventas descarga las series del Backoffice (incluye correlative_current)
   */
  @Get('serie')
  async getSeries(@Query('local_id') local_id: string) {
    return this.serieService.getSeriesByLocal(local_id);
  }

  /**
   * POST /sync/serie/correlative
   * Ventas envía el correlative_current actualizado al Backoffice
   * Acepta un objeto o un array de objetos: { id_serie, correlative_current }
   */
  @Post('serie/correlative')
  async updateCorrelative(
    @Body() body: UpdateCorrelativeDto | UpdateCorrelativeDto[],
  ) {
    return this.serieService.updateCorrelativeCurrent(body);
  }
}
