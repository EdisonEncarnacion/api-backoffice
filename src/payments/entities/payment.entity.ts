import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('payment')
export class Payment {
  @PrimaryColumn('uuid')
  id_payment: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column('int')
  state: number;

  @Column('varchar', { length: 255, nullable: true })
  description: string;

  @Column('numeric')
  amount: number;

  @Column('int')
  id_payment_method: number;

  @Column('int')
  id_currency: number;

  @Column('uuid')
  id_sale: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

}
