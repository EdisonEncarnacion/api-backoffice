import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';

@Module({
  imports: [],
  controllers: [MovementController],
  providers: [MovementService],
})
export class MovementModule { }
