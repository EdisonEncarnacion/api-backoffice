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
import { CashRegisterSideService } from './cash-register-side.service';
import { CreateCashRegisterDto } from './dto/create-cash-register.dto';
import { CreateCashRegisterSideDto } from './dto/create-cash-register-side.dto';
import { CashRegister } from './entities/cash-register.entity';
import { CashRegisterSide } from './entities/cash-register-side.entity';

@Controller('cash-registers')
export class CashRegisterController {
  constructor(
    private readonly cashRegisterService: CashRegisterService,
    private readonly cashRegisterSideService: CashRegisterSideService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() dto: CreateCashRegisterDto,
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
    const updated = await this.cashRegisterService.updateByCode(
      cash_register_code,
      id_local,
      body,
    );

    if (!updated) {
      throw new NotFoundException(
        `Caja con código ${cash_register_code} en local ${id_local} no encontrada`,
      );
    }

    return {
      statusCode: 200,
      message: `Caja con código ${cash_register_code} del local ${id_local} actualizada correctamente`,
    };
  }

  // ─── Cash Register Sides ──────────────────────────────────────────────────

  /**
   * POST /cash-registers/sides
   * Recibe datos de cash_register_side (ventas) y los sincroniza
   * en cash_register_sides (backoffice) resolviendo los IDs correctamente.
   */
  @Post('sides')
  @HttpCode(201)
  async createSide(
    @Body() dto: CreateCashRegisterSideDto,
  ): Promise<{ statusCode: number; message: string; data: CashRegisterSide }> {
    const created = await this.cashRegisterSideService.create(dto);
    return {
      statusCode: 201,
      message: 'Lado de caja registrado correctamente',
      data: created,
    };
  }
}
