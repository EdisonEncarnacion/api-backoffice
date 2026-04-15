import { Controller, Get, Query } from '@nestjs/common';
import { LocalPointsRulesService } from './local_points_rules.service';

@Controller('sync')
export class LocalPointsRulesController {
    constructor(private readonly localPointsRulesService: LocalPointsRulesService) { }

    @Get('local-points-rule')
    async getLocalPointsRules(@Query('since') since?: string) {
        return this.localPointsRulesService.getLocalPointsRulesForSync(since);
    }
}
