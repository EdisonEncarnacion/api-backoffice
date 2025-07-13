// src/usuarios/usuarios.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('sync/users')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async getUsersByLocal(@Query('local_id') localId: string) {
    return this.usuariosService.getUsersByLocal(localId);
  }
}
