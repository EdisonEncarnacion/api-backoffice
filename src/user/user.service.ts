import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserLocal } from './entities/user-local.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserLocal)
    private readonly userLocalRepository: Repository<UserLocal>,
  ) {}

  async getUsersForSync(since?: string, local_id?: string) {
    if (!local_id) return [];

    const query = this.userLocalRepository
      .createQueryBuilder('ul')
      .innerJoin('user_auth', 'u', 'u.id_user = ul.user_auth_id')
      .where('ul.local_id = :local_id', { local_id });

    if (since) {
      query.andWhere('u.updated_at > :since', { since });
    } else {
      query.andWhere('(u.updated_sync_at IS NULL OR u.updated_at > u.updated_sync_at)');
    }

    const result = await query
      .select([
        'u.id_user AS id_user',
        'u.username AS username',
        'u.password AS password',
        'u.card_number AS card_number',
        'ul.local_id AS local_id',
        'u.created_at AS created_at',
        'u.updated_at AS updated_at',
        'u.updated_sync_at AS updated_sync_at',
        'u.state_audit AS state_audit',
      ])
      .getRawMany();

    return result.map((r) => ({
      id_user: r.id_user,
      username: r.username,
      password: r.password,
      card_number: r.card_number,
      id_local: r.local_id,
      created_at: r.created_at,
      updated_at: r.updated_at,
      updated_sync_at: r.updated_sync_at,
      state_audit: r.state_audit,
    }));
  }
}
