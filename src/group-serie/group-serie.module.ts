import { Module } from '@nestjs/common';
import { GroupSerieService } from './group-serie.service';
import { GroupSerieController } from './group-serie.controller';

@Module({
  controllers: [GroupSerieController],
  providers: [GroupSerieService],
})
export class GroupSerieModule {}
