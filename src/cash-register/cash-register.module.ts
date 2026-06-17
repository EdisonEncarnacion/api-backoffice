import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashRegisterService } from './cash-register.service';
import { CashRegisterSideService } from './cash-register-side.service';
import { CashRegisterController } from './cash-register.controller';
import { CashRegister } from './entities/cash-register.entity';
import { CashRegisterSide } from './entities/cash-register-side.entity';
import { Side } from '../side/entities/side.entity';

@Module({
  controllers: [CashRegisterController],
  providers: [CashRegisterService, CashRegisterSideService],
})
export class CashRegisterModule {}

