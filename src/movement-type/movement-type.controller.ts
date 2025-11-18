import { Controller, Get, Query } from '@nestjs/common';
import { MovementTypeService } from './movement-type.service';

@Controller('sync')
export class MovementTypeController {
  constructor(private readonly movementTypeService: MovementTypeService) {}

  @Get('movement-type')
  async getMovementTypes(@Query('since') since?: string) {
    return this.movementTypeService.getMovementTypesForSync(since);
  }
}
