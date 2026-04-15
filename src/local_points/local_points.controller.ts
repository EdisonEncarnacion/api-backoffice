import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { LocalPointsService } from './local_points.service';
import { CreateLocalPointDto } from './dto/create-local-point.dto';

@Controller('sync')
export class LocalPointsController {
    constructor(private readonly localPointsService: LocalPointsService) { }

    @Get('local-point')
    async getLocalPoints(@Query('since') since?: string) {
        return this.localPointsService.getLocalPointsForSync(since);
    }

    @Post('local-point')
    async saveOrUpdateLocalPoint(@Body() dto: CreateLocalPointDto) {
        return this.localPointsService.saveOrUpdateLocalPointFromSync(dto);
    }
}
