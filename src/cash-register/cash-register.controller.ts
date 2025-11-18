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
@Patch('by-code/:cash_register_code')
async updateCashRegisterByCode(
  @Param('cash_register_code') cash_register_code: number,
  @Body() body: { id_state: number },
) {
  const updated = await this.cashRegisterService.updateByCode(cash_register_code, body);

  if (!updated) {
    throw new NotFoundException(`Caja con código ${cash_register_code} no encontrada`);
  }

  return {
    statusCode: 200,
    message: `Caja con código ${cash_register_code} actualizada correctamente`,
  };
}


}
