import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Side } from './entities/side.entity';
import { SideService } from './side.service';
import { SideController } from './side.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Side])],
  controllers: [SideController],
  providers: [SideService],
})
export class SideModule {}
