import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('deposit_type')
export class DepositType {
    @PrimaryColumn({ name: 'code_deposit_type', type: 'varchar' })
    code_deposit_type: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string;

    @Column({ name: 'movement_type', type: 'varchar', nullable: true })
    movement_type: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'char', length: 1 })
    state_audit: string;
}
