// src/tenant/tenant.middleware.ts
import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const host = req.headers.host;

        if (!host) {
            throw new UnauthorizedException('Host header is required');
        }

        // Extrae subdominio
        let subdomain: string;

        // Manejo de localhost para desarrollo
        if (host.startsWith('localhost')) {
            // localhost o localhost:3000 -> usa tenant de desarrollo
            subdomain = process.env.DEV_TENANT_SUBDOMAIN || 'dev';
        } else {
            // Producción: empresa1.midominio.com -> empresa1
            subdomain = host.split('.')[0];
        }

        if (!subdomain) {
            throw new UnauthorizedException('Invalid subdomain');
        }

        // Inyecta en request
        req['subdomain'] = subdomain;
        next();
    }
}
