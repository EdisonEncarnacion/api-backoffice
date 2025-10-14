import { Controller, Get, Post, Put, Param, Body, NotFoundException } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('sync')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // --- GET todos los clientes para sincronización
  @Get('client')
  async getClients() {
    return this.clientService.getClientsForSync();
  }

  // --- POST crear cliente desde ventas
  @Post('client') 
  saveOrUpdateClient(@Body() dto: CreateClientDto) {
    return this.clientService.saveOrUpdateClientFromSync(dto);
  }

  @Get('client/code/:code')
  async getClientByCode(@Param('code') code: string) {
    const client = await this.clientService.findByClientCode(code);
    if (!client) {
      throw new NotFoundException(`Cliente con código ${code} no existe`);
    }
    return client;
  }
  
  @Put('client/code/:code')
  async updateClientByCode(
    @Param('code') code: string,
    @Body() dto: CreateClientDto
  ) {
    const updated = await this.clientService.updateByClientCode(code, dto);
    if (!updated) {
      throw new NotFoundException(`Cliente con código ${code} no existe`);
    }
    return updated;
  }
  
}
