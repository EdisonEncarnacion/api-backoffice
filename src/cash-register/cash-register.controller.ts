import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { CashRegisterService } from './cash-register.service';
import { CreateCashRegisterDto } from './dto/create-cash-register.dto';
import { CashRegister } from './entities/cash-register.entity';

@Controller('cash-registers')
export class CashRegisterController {
  constructor(private readonly cashRegisterService: CashRegisterService) {}

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

  @Patch(':id_cash_register')
  async updateCashRegister(
    @Param('id_cash_register') id: number,
    @Body() body: { id_state: number }
  ): Promise<{ statusCode: number; message: string }> {
    const updated = await this.cashRegisterService.update(id, body);
    if (!updated) {
      throw new NotFoundException(`Caja ${id} no encontrada`);
    }

    return {
      statusCode: 200,
      message: `Caja ${id} actualizada correctamente`,
    };
  }
}
