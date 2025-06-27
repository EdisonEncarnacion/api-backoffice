import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class Product {
    @PrimaryColumn({ type: 'varchar', length: 45 })
    product_id: string;

    @Column({ type: 'varchar', nullable: false })
    description: string;

    @Column({ type: 'varchar', nullable: true })
    foreign_name: string;

    @Column({ type: 'int', default: 1 })
    state: number;

    @Column({ type: 'varchar', nullable: true })
    group_code: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price: number;

    @Column({ type: 'boolean', default: false })
    is_taxable: boolean;

    @Column({ type: 'int', default: 0 })
    stock: number;

    @Column({ type: 'varchar', nullable: true })
    measurement_unit: string;

    @Column({ type: 'uuid' })
    id_local: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'int', default: 1 })
    state_audit: number;
}
