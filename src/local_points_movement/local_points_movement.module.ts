import { Module } from '@nestjs/common';
import { LocalPointsMovementService } from './local_points_movement.service';
import { LocalPointsMovementController } from './local_points_movement.controller';

@Module({
    controllers: [LocalPointsMovementController],
    providers: [LocalPointsMovementService],
})
export class LocalPointsMovementModule { }
