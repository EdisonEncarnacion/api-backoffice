import { Module } from '@nestjs/common';
import { LocalPointsService } from './local_points.service';
import { LocalPointsController } from './local_points.controller';

@Module({
    controllers: [LocalPointsController],
    providers: [LocalPointsService],
})
export class LocalPointsModule { }
