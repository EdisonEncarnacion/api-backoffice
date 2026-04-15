import { Module } from '@nestjs/common';
import { LocalPointsConfigService } from './local_points_config.service';
import { LocalPointsConfigController } from './local_points_config.controller';

@Module({
    controllers: [LocalPointsConfigController],
    providers: [LocalPointsConfigService],
})
export class LocalPointsConfigModule { }
