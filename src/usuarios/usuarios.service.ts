// src/usuarios/usuarios.service.ts
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async getUsersByLocal(localId: string) {
    const trimmedLocalId = localId.trim();

    const query = `
      SELECT
      ua.id_user,
      ua.username,
      ua.password,
      ua.card_number,
      ul.local_id
    FROM user_local ul
    JOIN user_auth ua ON ul.user_auth_id = ua.id_user
    WHERE ul.local_id = $1;

    `;

    try {
      const result = await this.dataSource.query(query, [trimmedLocalId]);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
