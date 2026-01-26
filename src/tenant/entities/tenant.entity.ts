// src/tenant/entities/tenant.entity.ts
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

/**
 * TenantEntity - Mapea EXACTAMENTE la tabla 'tenant' (singular) de la BD master existente
 * NO crear migraciones para esta tabla - ya existe en master
 */
@Entity('tenant') // Tabla singular, no 'tenants'
export class TenantEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', name: 'dbName' })
    dbName: string;

    @Column({ type: 'varchar', unique: true })
    subdomain: string;

    @Column({ type: 'varchar', nullable: true })
    domain: string;

    @Column({ type: 'varchar', name: 'connectionUri' })
    connectionUri: string;

    @Column({ type: 'boolean', name: 'isActive' })
    isActive: boolean;

    @Column({ type: 'varchar', length: 20, nullable: true })
    plan: string;

    @Column({ type: 'timestamp', name: 'subscriptionStart', nullable: true })
    subscriptionStart: Date;

    @Column({ type: 'timestamp', name: 'subscriptionEnd', nullable: true })
    subscriptionEnd: Date;

    @Column({ type: 'varchar', name: 'contactEmail', nullable: true })
    contactEmail: string;

    @Column({ type: 'varchar', name: 'logoUrl', nullable: true })
    logoUrl: string;

    @Column({ type: 'jsonb', nullable: true })
    settings: Record<string, any>;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updated_at: Date;

    @Column({ length: 1, name: 'state_audit', default: 'A' })
    state_audit: string;
}
