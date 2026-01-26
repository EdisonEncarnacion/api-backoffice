// src/tenant/guards/tenant-active.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { TenantResolver } from '../tenant.resolver';

@Injectable()
export class TenantActiveGuard implements CanActivate {
    constructor(private readonly tenantResolver: TenantResolver) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const subdomain = request['subdomain'];

        const tenant = await this.tenantResolver.getTenantBySubdomain(subdomain);

        if (!tenant.isActive) {
            throw new ForbiddenException('Tenant is not active');
        }

        return true;
    }
}
