import { Module } from '@nestjs/common';
import { UuidMapperService } from './uuid-mapper.service';

@Module({
  providers: [UuidMapperService],
  exports: [UuidMapperService], // 👈 para poder usar en otros módulos
})
export class UuidMapperModule {}
