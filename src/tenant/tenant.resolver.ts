// src/tenant/tenant.resolver.ts
import {
    Injectable,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from './entities/tenant.entity';

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

        if (tenant.status !== 'active') {
            throw new ForbiddenException(`Tenant '${subdomain}' is ${tenant.status}`);
        }

        return tenant;
    }
}
