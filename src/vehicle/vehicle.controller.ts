import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Controller('sync')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('vehicle')
  async getVehicles(@Query('since') since?: string) {
    return this.vehicleService.getVehiclesForSync(since);
  }

  @Post('vehicle')
  async saveOrUpdateVehicle(@Body() dto: CreateVehicleDto) {
    return this.vehicleService.saveOrUpdateVehicleFromSync(dto);
  }
}
