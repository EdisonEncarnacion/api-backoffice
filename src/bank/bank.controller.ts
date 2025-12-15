import { Controller, Get, Query } from '@nestjs/common';
import { BankService } from './bank.service';

@Controller('sync')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get('bank')
  async getBanks(@Query('since') since?: string) {
    return this.bankService.getBanksForSync(since);
  }

}

