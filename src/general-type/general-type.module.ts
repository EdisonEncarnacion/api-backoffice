// general-type.module.ts
import { Module } from '@nestjs/common';
import { GeneralTypeService } from './general-type.service';
import { GeneralTypeController } from './general-type.controller';

@Module({
  providers: [GeneralTypeService],
  controllers: [GeneralTypeController], 
  exports: [GeneralTypeService],
})
export class GeneralTypeModule {}
