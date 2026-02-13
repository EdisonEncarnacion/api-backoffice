// src/config/database.config.ts
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TenantEntity } from '../tenant/entities/tenant.entity';

/**
 * Configuración de la base de datos MASTER
 * IMPORTANTE: NO ejecutar migraciones - la tabla 'tenant' ya existe
 */
export const getMasterDbConfig = (
    configService: ConfigService,
): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('MASTER_DB_HOST'),
    port: configService.get<number>('MASTER_DB_PORT'),
    username: configService.get<string>('MASTER_DB_USER'),
    password: configService.get<string>('MASTER_DB_PASSWORD'),
    database: configService.get<string>('MASTER_DB_NAME'),
    entities: [TenantEntity],
    synchronize: false, // NUNCA sincronizar - usar esquema existente
    migrationsRun: false, // NO ejecutar migraciones automáticamente
    logging: ['error'],
    logger: 'advanced-console',
    maxQueryExecutionTime: 1000, // Log queries taking more than 1 second
    migrations: [], // Array vacío - NO hay migraciones para master
    migrationsTableName: 'typeorm_migrations',
});
