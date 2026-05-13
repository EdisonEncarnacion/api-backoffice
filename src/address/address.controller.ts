// address.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('sync')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  /**
   * GET /sync/address
   * Retorna todas las direcciones.
   * Acepta query param opcional: ?since=2024-01-01T00:00:00Z
   * El servicio sincronizador (ventas → backoffice) consume este endpoint
   * para obtener las novedades desde una fecha determinada.
   */
  @Get('address')
  async getAddresses(@Query('since') since?: string) {
    return this.addressService.getAddressesForSync(since);
  }

  /**
   * GET /sync/address/:id
   * Retorna una dirección por su UUID.
   */
  @Get('address/:id')
  async getAddressById(@Param('id') id: string) {
    const address = await this.addressService.findById(id);
    if (!address) {
      throw new NotFoundException(`Dirección con id ${id} no existe`);
    }
    return address;
  }

  /**
   * POST /sync/address
   * Recibe una dirección desde el servicio de ventas y la guarda/actualiza en backoffice.
   * Hace upsert usando id_address (UUID generado en ventas).
   */
  @Post('address')
  saveOrUpdateAddress(@Body() dto: CreateAddressDto) {
    return this.addressService.saveOrUpdateAddressFromSync(dto);
  }
}
