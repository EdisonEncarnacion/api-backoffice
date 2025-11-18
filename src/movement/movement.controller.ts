import { Controller, Post, Body } from '@nestjs/common';
import { MovementService } from './movement.service';

@Controller('sync')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post('movement')
  async insertOrUpdate(@Body() body: { movements: any[] }) {
    const { inserted, updated } = await this.movementService.insertOrUpdateMovements(
      body.movements,
    );

    return {
      message: 'Movimientos procesados correctamente',
      inserted: inserted.length,
      updated: updated.length,
    };
  }
}
