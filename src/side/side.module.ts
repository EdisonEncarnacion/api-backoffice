// src/side/side.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SideService } from './side.service';
import { SideController } from './side.controller';
import { Side } from './entities/side.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Side])], 
  controllers: [SideController],
  providers: [SideService],
})
export class SideModule {}
