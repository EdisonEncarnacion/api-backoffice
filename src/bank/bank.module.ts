import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';

@Module({
  imports: [],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule { }
