// src/config/master.datasource.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: '.env.development' });

/**
 * DataSource para la base de datos MASTER
 * IMPORTANTE: La tabla 'tenant' YA EXISTE en master - NO ejecutar migraciones
 * Este datasource es solo para TypeORM CLI si fuera necesario
 */
export default new DataSource({
    type: 'postgres',
    host: process.env.MASTER_DB_HOST,
    port: parseInt(process.env.MASTER_DB_PORT || '5432', 10),
    database: process.env.MASTER_DB_NAME,
    username: process.env.MASTER_DB_USER,
    password: process.env.MASTER_DB_PASSWORD,
    entities: ['src/tenant/entities/*.entity.ts'],
    migrations: [], // NO ejecutar migraciones en master - la BD ya existe
    synchronize: false,
    migrationsRun: false,
    logging: true,
});
