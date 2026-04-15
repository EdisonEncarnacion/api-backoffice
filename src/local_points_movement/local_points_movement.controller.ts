import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { LocalPointsMovementService } from './local_points_movement.service';
import { CreateLocalPointMovementDto } from './dto/create-local-point-movement.dto';

@Controller('sync')
export class LocalPointsMovementController {
    constructor(private readonly localPointsMovementService: LocalPointsMovementService) { }

    @Get('local-point-movement')
    async getLocalPointsMovement(@Query('since') since?: string) {
        return this.localPointsMovementService.getLocalPointsMovementForSync(since);
    }

    @Post('local-point-movement')
    async saveOrUpdateLocalPointMovement(@Body() dto: CreateLocalPointMovementDto) {
        return this.localPointsMovementService.saveOrUpdateLocalPointMovementFromSync(dto);
    }
}
