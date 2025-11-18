// src/driver/driver.controller.ts
import { Controller, Get, Post, Put, Param, Body, NotFoundException, Query } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';

@Controller('sync')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('driver')
  async getDrivers(@Query('since') since?: string) {
    return this.driverService.getDriversForSync(since);
  }

  @Post('driver')
  saveOrUpdateDriver(@Body() dto: CreateDriverDto) {
    return this.driverService.saveOrUpdateDriverFromSync(dto);
  }

  @Get('driver/document/:document')
  async getDriverByDocument(@Param('document') document: string) {
    const driver = await this.driverService.findByDocument(document);
    if (!driver) {
      throw new NotFoundException(`Conductor con documento ${document} no existe`);
    }
    return driver;
  }

  @Put('driver/document/:document')
  async updateDriverByDocument(
    @Param('document') document: string,
    @Body() dto: CreateDriverDto
  ) {
    const updated = await this.driverService.updateByDocument(document, dto);
    if (!updated) {
      throw new NotFoundException(`Conductor con documento ${document} no existe`);
    }
    return updated;
  }
}
