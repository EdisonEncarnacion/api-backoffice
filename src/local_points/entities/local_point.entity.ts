import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('local_points')
export class LocalPoint {
    @PrimaryColumn('uuid')
    id_local_point: string;

    @Column('uuid')
    client_id: string;

    @Column('numeric', { precision: 18, scale: 6, default: 0 })
    balance: number;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @Column({ type: 'char', length: 1, default: 'A' })
    state_audit: string;
}
