// src/tenant/tenant-connection.manager.ts
import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TenantEntity } from './entities/tenant.entity';

@Injectable()
export class TenantConnectionManager implements OnModuleDestroy {
    private readonly logger = new Logger(TenantConnectionManager.name);
    private readonly connections = new Map<string, DataSource>();

    async getConnection(tenant: TenantEntity): Promise<DataSource> {
        // Verifica cache
        let dataSource = this.connections.get(tenant.id);

        if (dataSource && dataSource.isInitialized) {
            return dataSource;
        }

        // Crea nueva conexión
        const options: DataSourceOptions = {
            type: 'postgres',
            host: tenant.db_host,
            port: tenant.db_port,
            database: tenant.db_name,
            username: tenant.db_user,
            password: tenant.db_password,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
            migrationsRun: false,
            logging: process.env.NODE_ENV === 'development',
            poolSize: tenant.max_connections,
            extra: {
                max: tenant.max_connections,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 5000,
            },
        };

        dataSource = new DataSource(options);
        await dataSource.initialize();

        this.connections.set(tenant.id, dataSource);
        this.logger.log(
            `✅ Conexión creada para tenant: ${tenant.subdomain} (total activas: ${this.connections.size})`,
        );

        return dataSource;
    }

    async closeConnection(tenantId: string): Promise<void> {
        const dataSource = this.connections.get(tenantId);
        if (dataSource && dataSource.isInitialized) {
            await dataSource.destroy();
            this.connections.delete(tenantId);
            this.logger.log(`🔌 Conexión cerrada para tenant: ${tenantId}`);
        }
    }

    getActiveConnectionsCount(): number {
        return this.connections.size;
    }

    async onModuleDestroy() {
        this.logger.log(
            `🛑 Cerrando ${this.connections.size} conexiones activas...`,
        );
        for (const [tenantId, dataSource] of this.connections) {
            if (dataSource.isInitialized) {
                await dataSource.destroy();
            }
        }
        this.connections.clear();
    }
}
