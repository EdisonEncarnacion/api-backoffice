// general-type.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralType } from './entities/general-type.entity';
import { GeneralTypeService } from './general-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralType])],
  providers: [GeneralTypeService],
  exports: [GeneralTypeService], // 👈 importante exportarlo si lo usarás en otros módulos
})
export class GeneralTypeModule {}
