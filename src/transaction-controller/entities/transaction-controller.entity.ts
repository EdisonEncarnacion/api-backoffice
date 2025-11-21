import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('transaction_controller')
export class TransactionController {
  @PrimaryColumn('uuid') 
  id_transaction: string;

  @Column({ nullable: true })
  internal_code: string;

  @Column('int')
  id_state_transaction: number;

  @Column('decimal', { precision: 10, scale: 2 })
  gallons: number;

  @Column({ nullable: true })
  document_number?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  date: string;

  @Column({ type: 'time', nullable: true })
  time: string | null;

  @Column({ nullable: true })
  controller: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column('uuid')
  id_side: string;

  @Column('int', { nullable: true })
  id_sale_document_type: number | null;

  @Column('int')
  id_product: number;

}
