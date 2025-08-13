import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('sync')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('client')
  async getClients() {
    return this.clientService.getClientsForSync();
  }

  @Post('client') 
  saveOrUpdateClient(@Body() dto: CreateClientDto) {
    return this.clientService.saveOrUpdateClientFromSync(dto);
  }
}
