import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from '../entities/tenant.entity';
import { TenantConnectionManager } from '../tenant-connection.manager';

/**
 * TenantDbInitializerService - Inicializa funciones de base de datos en todos los tenants
 * Se ejecuta automáticamente al iniciar la aplicación (OnModuleInit)
 * 
 * Propósito:
 * - Asegurar que la función insert_movement_external exista en cada tenant DB
 * - Evitar errores "function does not exist" en runtime
 * - Escalar automáticamente cuando se crean nuevos tenants
 */
@Injectable()
export class TenantDbInitializerService implements OnModuleInit {
    private readonly logger = new Logger(TenantDbInitializerService.name);

    constructor(
        @InjectRepository(TenantEntity, 'master')
        private readonly tenantRepository: Repository<TenantEntity>,
        private readonly connectionManager: TenantConnectionManager,
    ) { }

    /**
     * Se ejecuta automáticamente cuando el módulo se inicializa
     */
    async onModuleInit() {
        this.logger.log('🚀 Iniciando inicialización de bases de datos de tenants...');

        try {
            // Cargar todos los tenants activos desde la base de datos master
            const tenants = await this.tenantRepository.find({
                where: { isActive: true },
            });

            this.logger.log(`📋 Encontrados ${tenants.length} tenants activos`);

            // Inicializar cada tenant (sin bloquear si uno falla)
            const results = await Promise.allSettled(
                tenants.map((tenant) => this.initializeTenantDatabase(tenant)),
            );

            // Contar éxitos y fallos
            const successful = results.filter((r) => r.status === 'fulfilled').length;
            const failed = results.filter((r) => r.status === 'rejected').length;

            this.logger.log(
                `✅ Inicialización completada: ${successful} exitosos, ${failed} fallidos`,
            );
        } catch (error) {
            this.logger.error(
                '❌ Error al cargar tenants desde master database',
                error.stack,
            );
        }
    }

    /**
     * Inicializa la base de datos de un tenant específico
     * Crea la función insert_movement_external si no existe
     */
    private async initializeTenantDatabase(tenant: TenantEntity): Promise<void> {
        try {
            // Obtener conexión al tenant usando el TenantConnectionManager
            const dataSource = await this.connectionManager.getConnection(tenant);

            // Ejecutar SQL idempotente para crear la función
            await this.createInsertMovementExternalFunction(dataSource, tenant.subdomain);

            this.logger.log(`✔ Function ready in tenant: ${tenant.subdomain}`);
        } catch (error) {
            this.logger.error(
                `✖ Failed tenant: ${tenant.subdomain} - ${error.message}`,
                error.stack,
            );
            throw error; // Re-throw para que Promise.allSettled lo capture
        }
    }

    /**
     * Crea la función insert_movement_external en la base de datos del tenant
     * SQL idempotente: puede ejecutarse múltiples veces sin problemas
     */
    private async createInsertMovementExternalFunction(
        dataSource: any,
        tenantName: string,
    ): Promise<void> {
        const queryRunner = dataSource.createQueryRunner();

        try {
            await queryRunner.connect();

            // 1. Eliminar la función si existe (para evitar conflictos de versiones)
            await queryRunner.query(`
        DROP FUNCTION IF EXISTS insert_movement_external(
          UUID, UUID, UUID, INT, VARCHAR, VARCHAR, NUMERIC, NUMERIC, 
          TIMESTAMPTZ, TEXT, TIMESTAMPTZ, TIMESTAMPTZ, UUID
        );
      `);

            // 2. Crear la función
            await queryRunner.query(`
        CREATE OR REPLACE FUNCTION insert_movement_external(
          p_id_movement UUID,
          p_account_id UUID,
          p_card_id UUID,
          p_type_id INT,
          p_status VARCHAR,
          p_reference_document VARCHAR,
          p_amount NUMERIC,
          p_balance_after NUMERIC,
          p_issued_at TIMESTAMPTZ,
          p_description TEXT,
          p_created_at TIMESTAMPTZ,
          p_updated_at TIMESTAMPTZ,
          p_created_by UUID
        )
        RETURNS VOID
        LANGUAGE plpgsql
        AS $$
        BEGIN
          -- Insertar movimiento (ON CONFLICT para idempotencia)
          INSERT INTO movement (
            id_movement,
            account_id,
            card_id,
            type_id,
            status,
            reference_document,
            amount,
            balance_after,
            issued_at,
            description,
            created_by,
            updated_by,
            created_at,
            updated_at,
            state_audit
          )
          VALUES (
            p_id_movement,
            p_account_id,
            p_card_id,
            p_type_id,
            p_status,
            p_reference_document,
            p_amount,
            p_balance_after,
            p_issued_at,
            p_description,
            p_created_by,
            p_created_by,
            p_created_at,
            p_updated_at,
            'A'
          )
          ON CONFLICT (id_movement) DO NOTHING;

          -- Actualizar balance de la tarjeta o cuenta
          IF p_card_id IS NOT NULL THEN
            UPDATE account_card
            SET balance = balance + p_amount,
                updated_at = NOW()
            WHERE id_account_card = p_card_id;
          ELSE
            UPDATE account
            SET balance = balance + p_amount,
                updated_at = NOW()
            WHERE id_account = p_account_id;
          END IF;
        END;
        $$;
      `);

            this.logger.debug(
                `  → Función insert_movement_external creada en tenant: ${tenantName}`,
            );
        } finally {
            await queryRunner.release();
        }
    }
}
