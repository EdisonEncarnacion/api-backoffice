import { Controller, Get, Query } from '@nestjs/common';
import { LocalPointsConfigService } from './local_points_config.service';

@Controller('sync')
export class LocalPointsConfigController {
    constructor(private readonly localPointsConfigService: LocalPointsConfigService) { }

    @Get('local-points-config')
    async getLocalPointsConfig(@Query('since') since?: string) {
        return this.localPointsConfigService.getLocalPointsConfigForSync(since);
    }
}
