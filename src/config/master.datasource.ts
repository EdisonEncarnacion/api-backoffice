// src/config/master.datasource.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: '.env.development' });

export default new DataSource({
    type: 'postgres',
    host: process.env.MASTER_DB_HOST,
    port: parseInt(process.env.MASTER_DB_PORT || '5432', 10),
    database: process.env.MASTER_DB_NAME,
    username: process.env.MASTER_DB_USER,
    password: process.env.MASTER_DB_PASSWORD,
    entities: ['src/tenant/entities/*.entity.ts'],
    migrations: ['src/migrations/master/*.ts'],
    synchronize: false,
    migrationsRun: false,
    logging: true,
});
