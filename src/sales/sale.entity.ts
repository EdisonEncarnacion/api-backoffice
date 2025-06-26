import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sale' }) // 👈 muy importante
export class Sale {
    @PrimaryColumn('uuid')
    id_sale: string;

    @Column()
    state: string;

    @Column('numeric')
    total_amount: number;

    @Column('numeric')
    subtotal: number;

    @Column('numeric')
    total_discount: number;

    @Column()
    document_number: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    @Column('numeric')
    op_grabada: number;

    @Column('numeric')
    total_tax: number;

    @Column('numeric')
    exonerado: number;

    @Column('numeric')
    transferencia_gratuita: number;

    @Column('uuid')
    id_local: string;

    @Column('uuid')
    id_sale_document_type: string;

    @Column('uuid')
    id_payment_type: string;

    @Column('uuid')
    id_cash_register: string;

    @Column('uuid')
    id_client: string;

    @Column('uuid')
    id_user: string;
}
