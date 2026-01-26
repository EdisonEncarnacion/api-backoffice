import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementType } from './entities/movement-type.entity';
import { MovementTypeService } from './movement-type.service';
import { MovementTypeController } from './movement-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MovementType])],
  controllers: [MovementTypeController],
  providers: [MovementTypeService],
})
export class MovementTypeModule {}
