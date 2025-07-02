// src/deposit/deposit.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposit } from './entities/deposit.entity';
import { DepositType } from './entities/deposit-type.entity';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deposit, DepositType])], // 👈 Aquí IMPORTANTE
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule { }
