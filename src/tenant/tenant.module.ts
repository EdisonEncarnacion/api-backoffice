// src/tenant/tenant.module.ts
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TenantEntity } from './entities/tenant.entity';
import { TenantResolver } from './tenant.resolver';
import { TenantConnectionManager } from './tenant-connection.manager';
import { TenantConnectionProvider } from './providers/tenant-connection.provider';
import { getMasterDbConfig } from '../config/database.config';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            name: 'master',
            useFactory: getMasterDbConfig,
        }),
        TypeOrmModule.forFeature([TenantEntity], 'master'),
    ],
    providers: [TenantResolver, TenantConnectionManager, TenantConnectionProvider],
    exports: [TenantResolver, TenantConnectionManager, TenantConnectionProvider],
})
export class TenantModule { }
