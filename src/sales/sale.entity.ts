import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sale' })
export class Sale {
  @PrimaryColumn('uuid')
  id_sale: string;

  @Column({ type: 'uuid', nullable: true })
  external_sale_id: string;

  @Column('int')
  state: number;

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

  @Column('int')
  id_sale_document_type: number;

  @Column('uuid')
  id_payment_type: string;

  @Column('uuid')
  id_cash_register: string;

  @Column('uuid')
  id_client: string;

  @Column('uuid')
  id_user: string;

  @Column('int', { name: 'id_document_operation_type', nullable: true })
  id_document_operation_type: number;

  @Column('int', { name: 'id_sale_operation_type', nullable: true })
  id_sale_operation_type: number;

  @Column('varchar', { nullable: true })
  serie: string;

  @Column('int', { nullable: true })
  number: number;

  @Column('date', { nullable: true })
  issue_date: Date;

  @Column('date', { nullable: true })
  date_of_due: Date;

  @Column('date', { nullable: true })
  exchange_rate_date: Date;

  @Column('varchar', { length: 3, nullable: true })
  currency_iso_code: string;

  @Column('numeric', { nullable: true })
  exchange_rate: number;

  @Column('bool', { nullable: true })
  has_reference: boolean;

  @Column('bool', { nullable: true })
  is_used: boolean;

  @Column('varchar', { length: 256, nullable: true })
  sunat_hash: string;

  @Column('jsonb', { nullable: true })
  meta: any;

  @Column('jsonb', { nullable: true })
  perception: any;

  @Column('jsonb', { nullable: true })
  detraction: any;

  @Column('jsonb', { nullable: true })
  retention: any;

  @Column('jsonb', { nullable: true })
  collection_breakdown: any;

  @Column('numeric', { nullable: true })
  total_to_pay: number;

  @Column('numeric', { nullable: true })
  paid_amount: number;

  @Column('numeric', { nullable: true })
  outstanding_balance: number;

  @Column('bool', { nullable: true })
  prices_include_tax: boolean;

  @Column('numeric', { nullable: true })
  advance_amount: number;

  @Column('numeric', { nullable: true })
  advance_balance: number;

  @Column('numeric', { nullable: true })
  credit_note_amount: number;

  @Column('numeric', { nullable: true })
  debit_note_amount: number;

  @Column('varchar', { length: 50, nullable: true })
  origin: string;

  @Column('jsonb', { nullable: true })
  client_snapshot: any;

  @Column('jsonb', { nullable: true })
  local_snapshot: any;

  @Column('jsonb', { nullable: true })
  driver_snapshot: any;

  @Column('jsonb', { nullable: true })
  vehicle_snapshot: any;

  @Column('uuid', { nullable: true })
id_driver: string | null;

@Column('uuid', { nullable: true })
id_vehicle: string | null;

}
