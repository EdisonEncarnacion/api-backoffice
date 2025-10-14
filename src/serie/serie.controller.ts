// src/serie/serie.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { SerieService } from './serie.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { Serie } from './entities/serie.entity';  

@Controller('sync/serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @Get()
  async findAll(): Promise<Serie[]> {
    return this.serieService.findAll();
  }
}
