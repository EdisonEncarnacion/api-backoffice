// general-type.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralType } from './entities/general-type.entity';
import { GeneralTypeService } from './general-type.service';
import { GeneralTypeController } from './general-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralType])],
  providers: [GeneralTypeService],
  controllers: [GeneralTypeController], 
  exports: [GeneralTypeService],
})
export class GeneralTypeModule {}
