// src/group-serie/group-serie.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupSerieService } from './group-serie.service';
import { GroupSerieController } from './group-serie.controller';
import { GroupSerie } from './entities/group-serie.entity';
import { UuidMapperService } from '../shared/uuid-mapper.service'; 

@Module({
  imports: [TypeOrmModule.forFeature([GroupSerie])],
  controllers: [GroupSerieController],
  providers: [GroupSerieService, UuidMapperService], 
  exports: [GroupSerieService],
})
export class GroupSerieModule {}
