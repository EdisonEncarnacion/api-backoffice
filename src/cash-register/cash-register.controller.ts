import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CashRegisterService } from './cash-register.service';
import { CreateCashRegisterDto } from './dto/create-cash-register.dto';
import { CashRegister } from './entities/cash-register.entity';

@Controller('cash-registers')
export class CashRegisterController {
    constructor(private readonly cashRegisterService: CashRegisterService) { }

    @Post()
    @HttpCode(201)
    async create(
        @Body() dto: CreateCashRegisterDto
    ): Promise<{ statusCode: number; message: string; data: CashRegister }> {
        const created = await this.cashRegisterService.create(dto);
        return {
            statusCode: 201,
            message: 'Caja registrada correctamente',
            data: created,
        };
    }
}
