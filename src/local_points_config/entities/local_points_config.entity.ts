import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('local_points_config')
export class LocalPointsConfig {
    @PrimaryColumn('uuid')
    id_local_points_config: string;

    @Column('numeric', { precision: 18, scale: 6 })
    points_per_sol: number;

    @Column({ type: 'bool', default: true })
    is_active: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @Column({ type: 'char', length: 1, default: 'A' })
    state_audit: string;
}
