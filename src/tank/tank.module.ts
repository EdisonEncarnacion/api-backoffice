import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tank } from './entities/tank.entity';
import { TankService } from './tank.service';
import { TankController } from './tank.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tank])],
  controllers: [TankController],
  providers: [TankService],
  exports: [TankService],
})
export class TankModule {}
