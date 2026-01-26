import { Module } from '@nestjs/common';
import { HoseService } from './hose.service';
import { HoseController } from './hose.controller';

@Module({
  controllers: [HoseController],
  providers: [HoseService],
})
export class HoseModule {}
