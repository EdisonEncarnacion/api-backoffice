import { Controller, Post, Body } from '@nestjs/common';
import { CashRegisterService } from './cash-register.service';
import { CreateCashRegisterDto } from './dto/create-cash-register.dto';

@Controller('cash-registers')
export class CashRegisterController {
    constructor(private readonly cashRegisterService: CashRegisterService) { }

    @Post()
    create(@Body() dto: CreateCashRegisterDto) {
        console.log('📥 Tipo y valor de id_user:', typeof dto.id_user, dto.id_user);
        return this.cashRegisterService.create(dto);
    }


}
