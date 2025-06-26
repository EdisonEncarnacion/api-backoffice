import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('sale_detail')
export class SaleDetail {
    @PrimaryColumn('uuid') // ← No usar @PrimaryGeneratedColumn si el UUID viene de otra BD
    id_sale_detail: string;

    @Column('int')
    quantity: number;

    @Column('decimal')
    product_price: number;

    @Column('decimal')
    tax_detail: number;

    @Column('decimal')
    total_amount: number;

    @Column('timestamp')
    system_date: Date;

    @Column('uuid')
    id_transaction: string;

    @Column('varchar', { length: 45 }) // Producto no usa UUID, sino varchar
    id_product: string;

    @Column('uuid')
    id_sale: string;

    @Column('uuid')
    id_side: string;
}
