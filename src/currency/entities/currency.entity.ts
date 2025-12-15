import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('currency')
export class Currency {
    @PrimaryColumn('int')
    id_currency: number;

    @Column({ type: 'varchar', length: 255 })
    currency_code: string;

    @Column({ type: 'varchar', length: 255 })
    currency_type: string;

    @Column({ type: 'varchar', length: 255 })
    simple_description: string;

    @Column({ type: 'varchar', length: 250 })
    complete_description: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    exchangeRate: number;
}
