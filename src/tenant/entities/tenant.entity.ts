// src/tenant/entities/tenant.entity.ts
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('tenants')
export class TenantEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, length: 100 })
    subdomain: string;

    @Column({ length: 255 })
    company_name: string;

    @Column({ length: 20, default: 'active' })
    status: 'active' | 'inactive' | 'suspended';

    @Column({ length: 255 })
    db_host: string;

    @Column({ type: 'int', default: 5432 })
    db_port: number;

    @Column({ length: 100 })
    db_name: string;

    @Column({ length: 100 })
    db_user: string;

    @Column({ length: 255 })
    db_password: string; // Encriptado en producción

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ nullable: true, length: 100 })
    last_migration_version: string;

    @Column({ type: 'int', default: 10 })
    max_connections: number;

    @Column({ length: 50, default: 'UTC' })
    timezone: string;
}
