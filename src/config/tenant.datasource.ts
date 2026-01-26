// src/config/tenant.datasource.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: '.env.development' });

// Esta configuración se usa para generar migraciones de tenants
// En runtime, las credenciales vienen de la BD Master
export default new DataSource({
    type: 'postgres',
    host: process.env.TYPEORM_HOST || process.env.DATABASE_HOST,
    port: parseInt(
        process.env.TYPEORM_PORT || process.env.DATABASE_PORT || '5432',
        10,
    ),
    database: process.env.TYPEORM_DATABASE || process.env.DATABASE_NAME,
    username: process.env.TYPEORM_USERNAME || process.env.DATABASE_USER,
    password: process.env.TYPEORM_PASSWORD || process.env.DATABASE_PASSWORD,
    entities: ['src/**/entities/*.entity.ts'],
    migrations: ['src/migrations/tenant/*.ts'],
    synchronize: false,
    migrationsRun: false,
    logging: true,
});
