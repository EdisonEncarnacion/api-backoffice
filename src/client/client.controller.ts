import { Controller, Get, Post, Put, Param, Body, NotFoundException, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('sync')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

@Get('client')
async getClients(@Query('since') since?: string) {
  return this.clientService.getClientsForSync(since);
}


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


  @Get('client/document/:document')
  async getClientByDocument(@Param('document') document: string) {
    const client = await this.clientService.findByDocumentNumber(document);
    if (!client) {
      throw new NotFoundException(`Cliente con documento ${document} no existe`);
    }
    return client;
  }

 
  @Put('client/document/:document')
  async updateClientByDocument(
    @Param('document') document: string,
    @Body() dto: CreateClientDto
  ) {
    const updated = await this.clientService.updateByDocumentNumber(document, dto);
    if (!updated) {
      throw new NotFoundException(`Cliente con documento ${document} no existe`);
    }
    return updated;
  }
}
