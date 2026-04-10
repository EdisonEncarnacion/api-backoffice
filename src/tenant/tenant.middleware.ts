// src/tenant/tenant.middleware.ts
import {
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const tenant =
            (req.headers['x-tenant-id'] as string) ||
            req.hostname?.split('.')?.[0] ||
            process.env.DEV_TENANT_SUBDOMAIN ||
            'dev';

        console.log('Resolved tenant:', tenant);

        // Inyecta en request
        req['subdomain'] = tenant;

        next();
    }
}
