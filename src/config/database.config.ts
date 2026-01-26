// src/config/database.config.ts
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TenantEntity } from '../tenant/entities/tenant.entity';

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
    synchronize: false,
    migrationsRun: false,
    logging: configService.get<string>('NODE_ENV') === 'development',
    migrations: [__dirname + '/../migrations/master/**/*.js'],
    migrationsTableName: 'typeorm_migrations',
});
