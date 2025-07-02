import { Body, Controller, Post } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';

@Controller('deposits')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post()
  async create(@Body() deposit: CreateDepositDto) {
    return await this.depositService.createDeposit(deposit);
  }
}
