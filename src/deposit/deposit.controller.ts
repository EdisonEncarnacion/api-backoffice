import { Body, Controller, Post } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { CreateDepositTypeDto } from './dto/create-deposit-type.dto';

@Controller('deposits')
export class DepositController {
    constructor(private readonly depositService: DepositService) { }

    @Post()
    async create(@Body() body: { deposit: CreateDepositDto; deposit_type: CreateDepositTypeDto }) {
        return await this.depositService.createDepositWithType(body.deposit, body.deposit_type);
    }
}
