import { Injectable } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { AuthorizationCode } from './entities/authorization-code.entity';

@Injectable()
export class AuthorizationCodeService {
    constructor(private readonly tenantConnection: TenantConnectionProvider) { }

    async getAuthorizationCodesForSync(since?: string) {
        const dataSource = await this.tenantConnection.getDataSource();
        const authorizationCodeRepo = dataSource.getRepository(AuthorizationCode);

        const query = authorizationCodeRepo.createQueryBuilder('authorization_code');

        if (since) {
            query.where('authorization_code.updated_at > :since', { since });
        }

        const authorizationCodes = await query.getMany();

        return authorizationCodes.map((ac) => ({
            id_authorization: ac.id_authorization,
            code: ac.code,
            id_local: ac.id_local,
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

