import { Controller, Post, Body } from '@nestjs/common';
import { MovementService } from './movement.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@Controller('sync')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post('movement')
  async insert(@Body() dto: CreateMovementDto) {
    const result = await this.movementService.insertMovement(dto);

    return {
      message: 'Movimiento procesado correctamente',
      data: result,
    };
  }
}
