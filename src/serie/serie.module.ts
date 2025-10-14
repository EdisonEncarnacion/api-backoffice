// src/serie/serie.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serie } from './entities/serie.entity';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';
import { UuidMapperService } from '../shared/uuid-mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Serie])],
  controllers: [SerieController],
  providers: [SerieService, UuidMapperService], 
  exports: [SerieService],
})
export class SerieModule {}
