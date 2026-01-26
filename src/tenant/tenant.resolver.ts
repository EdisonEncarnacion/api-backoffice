// src/tenant/tenant.resolver.ts
import {
    Injectable,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from './entities/tenant.entity';

/**
 * TenantResolver - Resuelve tenants desde la BD master usando el esquema REAL
 * Busca en la tabla 'tenant' (singular) con columna 'isActive'
 */
@Injectable()
export class TenantResolver {
    constructor(
        @InjectRepository(TenantEntity, 'master')
        private readonly tenantRepository: Repository<TenantEntity>,
    ) { }

    async getTenantBySubdomain(subdomain: string): Promise<TenantEntity> {
        const tenant = await this.tenantRepository.findOne({
            where: { subdomain },
        });

        if (!tenant) {
            throw new UnauthorizedException(`Tenant '${subdomain}' not found`);
        }

        // Usar isActive en lugar de status
        if (!tenant.isActive) {
            throw new ForbiddenException(`Tenant '${subdomain}' is inactive`);
        }

        return tenant;
    }
}
