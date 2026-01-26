import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupSerie } from './entities/group-serie.entity';
import { GroupSerieService } from './group-serie.service';
import { GroupSerieController } from './group-serie.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GroupSerie])],
  controllers: [GroupSerieController],
  providers: [GroupSerieService],
})
export class GroupSerieModule {}
