import { Module } from '@nestjs/common';
import { UuidMapperService } from './uuid-mapper.service';

@Module({
  providers: [UuidMapperService],
  exports: [UuidMapperService], 
})
export class UuidMapperModule {}
