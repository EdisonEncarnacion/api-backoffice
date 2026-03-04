import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('payment_method_type')
export class PaymentMethodType {
    @PrimaryColumn({ name: 'id_payment_method_type', type: 'int4' })
    id_payment_method_type: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    short_name: string;

    @Column({ type: 'bool', default: true })
    is_active: boolean;

    @Column({ name: 'payment_method_id', type: 'int4', nullable: true })
    payment_method_id: number;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;
}
