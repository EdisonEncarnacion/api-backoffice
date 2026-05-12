import { Module } from '@nestjs/common';
import { LocalService } from './local.service';
import { LocalController } from './local.controller';

@Module({
  imports: [],
  controllers: [LocalController],
  providers: [LocalService],
})
export class LocalModule {}
