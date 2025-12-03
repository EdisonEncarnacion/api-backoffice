import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hose } from './entities/hose.entity';
import { HoseService } from './hose.service';
import { HoseController } from './hose.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hose])],
  controllers: [HoseController],
  providers: [HoseService],
})
export class HoseModule {}
