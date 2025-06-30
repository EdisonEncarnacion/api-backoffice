import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashRegisterService } from './cash-register.service';
import { CashRegisterController } from './cash-register.controller';
import { CashRegister } from './entities/cash-register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CashRegister])],
  controllers: [CashRegisterController],
  providers: [CashRegisterService],
})
export class CashRegisterModule { }
