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
  @Patch('by-code/:cash_register_code/:id_local')
  async updateCashRegisterByCode(
    @Param('cash_register_code') cash_register_code: number,
    @Param('id_local') id_local: string,
    @Body() body: { id_state: number },
  ) {
    const updated = await this.cashRegisterService.updateByCode(cash_register_code, id_local, body);

    if (!updated) {
      throw new NotFoundException(`Caja con código ${cash_register_code} en local ${id_local} no encontrada`);
    }

    return {
      statusCode: 200,
      message: `Caja con código ${cash_register_code} del local ${id_local} actualizada correctamente`,
    };
  }


}
