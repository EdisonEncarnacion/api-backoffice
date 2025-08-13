// src/usuarios/usuarios.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger(UsuariosService.name);

  constructor(
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async getUsersByLocal(localId: string) {
    const query = `
      SELECT
        ua.migration_sync_id,
        ua.id_user,
        ua.username,
        ua.password,
        ua.card_number
      FROM user_local ul
      JOIN user_auth ua ON ul.user_auth_id = ua.id_user
      WHERE ul.local_id = $1
        AND ul.state = 'A'
    `;
  
    const result = await this.dataSource.query(query, [localId]);
  
   
    for (const user of result) {
      if (!user.migration_sync_id) {
        this.logger.warn(`⚠ Usuario con migration_sync_id NULL omitido: ${JSON.stringify(user)}`);
      }
    }
  
    return result;
  }
}  
