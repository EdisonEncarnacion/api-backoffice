import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizationCode } from './entities/authorization-code.entity';

@Injectable()
export class AuthorizationCodeService {
    constructor(
        @InjectRepository(AuthorizationCode)
        private readonly authorizationCodeRepo: Repository<AuthorizationCode>,
    ) { }

    async getAuthorizationCodesForSync(since?: string) {
        const query = this.authorizationCodeRepo.createQueryBuilder('authorization_code');

        if (since) {
            query.where('authorization_code.updated_at > :since', { since });
        }

        const authorizationCodes = await query.getMany();

        return authorizationCodes.map(ac => ({
            id_authorization: ac.id_authorization,
            code: ac.code,
            sede_id: ac.sede_id,
            expires_at: ac.expires_at,
            duration: ac.duration,
            used: ac.used,
            sale_id: ac.sale_id,
            created_by: ac.created_by,
            created_at: ac.created_at,
            updated_at: ac.updated_at,
        }));
    }
}
