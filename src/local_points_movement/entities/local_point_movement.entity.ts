import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('local_points_movement')
export class LocalPointMovement {
    @PrimaryColumn('uuid')
    id_local_point_movement: string;

    @Column('uuid')
    local_point_id: string;

    @Column('uuid', { nullable: true })
    sale_id: string;

    @Column('numeric', { precision: 18, scale: 6, nullable: true })
    amount: number;

    @Column('numeric', { precision: 18, scale: 6, nullable: true })
    quantity: number;

    @Column('numeric', { precision: 18, scale: 6, nullable: true })
    balance_after: number;

    @Column('jsonb', { nullable: true })
    metadata: object;

    @Column({ type: 'varchar', nullable: true })
    movement_type: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @Column({ type: 'char', length: 1, default: 'A' })
    state_audit: string;
}
