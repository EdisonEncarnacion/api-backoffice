import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('local_points_rules')
export class LocalPointsRule {
    @PrimaryColumn('uuid')
    id_rule: string;

    @Column('int', { nullable: true })
    account_type_id: number;

    @Column('varchar', { length: 255, nullable: true })
    name: string;

    @Column('text', { nullable: true })
    description: string;

    @Column('bool', { default: true })
    is_active: boolean;

    @Column('int', { nullable: true })
    product_id: number;

    @Column('enum', { enumName: 'rule_condition_enum', nullable: true })
    condition_type: string;

    @Column('numeric', { precision: 18, scale: 6, nullable: true })
    min_threshold: number;

    @Column('numeric', { precision: 18, scale: 6, nullable: true })
    points_per_unit: number;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @Column({ type: 'char', length: 1, default: 'A' })
    state_audit: string;
}
