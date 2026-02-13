// src/tenant/tenant-connection.manager.ts
import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TenantEntity } from './entities/tenant.entity';

/**
 * TenantConnectionManager - Gestiona conexiones a bases de datos de tenants
 * Usa connectionUri del esquema REAL de la BD master
 */
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

        // Parsear connectionUri para obtener credenciales
        const connectionConfig = this.parseConnectionUri(tenant);

        // Crea nueva conexión
        const options: DataSourceOptions = {
            type: 'postgres',
            host: connectionConfig.host,
            port: connectionConfig.port,
            database: connectionConfig.database,
            username: connectionConfig.username,
            password: connectionConfig.password,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
            migrationsRun: false,
            logging: ['error'],
            logger: 'advanced-console',
            maxQueryExecutionTime: 1000, // Log queries taking more than 1 second
            extra: {
                max: 10, // Default pool size
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

    /**
     * Parsea connectionUri o usa dbName + variables de entorno
     * Formato esperado: postgresql://user:password@host:port/database
     */
    private parseConnectionUri(tenant: TenantEntity): {
        host: string;
        port: number;
        database: string;
        username: string;
        password: string;
    } {
        // Si existe connectionUri, usarlo (PRIORIDAD)
        if (tenant.connectionUri) {
            try {
                const url = new URL(tenant.connectionUri);
                return {
                    host: url.hostname,
                    port: parseInt(url.port) || 5432,
                    database: url.pathname.slice(1), // Remover el '/' inicial
                    username: url.username,
                    password: url.password,
                };
            } catch (error) {
                this.logger.warn(
                    `Error parseando connectionUri para tenant ${tenant.subdomain}, usando fallback`,
                );
            }
        }

        // Fallback: usar dbName + credenciales de master
        return {
            host: process.env.MASTER_DB_HOST || 'localhost',
            port: parseInt(process.env.MASTER_DB_PORT || '5432', 10),
            database: tenant.dbName,
            username: process.env.MASTER_DB_USER || 'postgres',
            password: process.env.MASTER_DB_PASSWORD || '',
        };
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
