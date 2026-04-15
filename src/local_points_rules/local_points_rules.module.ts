import { Module } from '@nestjs/common';
import { LocalPointsRulesService } from './local_points_rules.service';
import { LocalPointsRulesController } from './local_points_rules.controller';

@Module({
    controllers: [LocalPointsRulesController],
    providers: [LocalPointsRulesService],
})
export class LocalPointsRulesModule { }
