// person-address.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { PersonAddressService } from './person-address.service';
import { CreatePersonAddressDto } from './dto/create-person-address.dto';

@Controller('sync')
export class PersonAddressController {
  constructor(private readonly personAddressService: PersonAddressService) {}

  /**
   * GET /sync/person-address
   * Retorna todos los registros de person_address.
   * Acepta query param opcional: ?since=2024-01-01T00:00:00Z
   */
  @Get('person-address')
  async getPersonAddresses(@Query('since') since?: string) {
    return this.personAddressService.getPersonAddressesForSync(since);
  }

  /**
   * GET /sync/person-address/:id
   * Retorna un person_address por su UUID.
   */
  @Get('person-address/:id')
  async getPersonAddressById(@Param('id') id: string) {
    const record = await this.personAddressService.findById(id);
    if (!record) {
      throw new NotFoundException(`PersonAddress con id ${id} no existe`);
    }
    return record;
  }

  /**
   * POST /sync/person-address
   * Recibe un person_address desde el servicio de ventas y lo guarda/actualiza en backoffice.
   * Hace upsert usando id_person_address (UUID generado en ventas).
   */
  @Post('person-address')
  saveOrUpdatePersonAddress(@Body() dto: CreatePersonAddressDto) {
    return this.personAddressService.saveOrUpdatePersonAddressFromSync(dto);
  }
}
