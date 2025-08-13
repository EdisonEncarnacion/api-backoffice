import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('sale_detail')
export class SaleDetail {
    @PrimaryColumn('uuid') 
    id_sale_detail: string;

    @Column('int')
    quantity: number;

    @Column('decimal')
    product_price: number;

    @Column('jsonb')
    tax_detail: { type: string; amount: number };

    @Column('decimal')
    total_amount: number;


    @Column('uuid')
    id_transaction: string;

    @Column('varchar', { length: 45 }) 
    id_product: string;

    @Column('uuid')
    id_sale: string;

    @Column('uuid')
    id_side: string;
}

