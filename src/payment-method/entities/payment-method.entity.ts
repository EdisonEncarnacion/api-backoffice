import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('payment_method')
export class PaymentMethod {
    @PrimaryColumn('int8')
    id_payment_method: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    payment_code: string;

    @Column({ type: 'bool', default: true })
    is_active: boolean;

    @Column({ type: 'varchar', length: 10, nullable: true })
    code_component: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'char', length: 1 })
    state_audit: string;
}
