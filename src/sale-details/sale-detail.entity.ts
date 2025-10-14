import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity('sale_detail')
export class SaleDetail {
  @PrimaryColumn('uuid') 
  id_sale_detail: string;

  @Column('int')
  quantity: number;

  @Column('jsonb')
  tax_detail: any;

  @Column('decimal')
  total_amount: number;

  @Column('uuid', { nullable: true })
  id_transaction?: string | null;

  @Column('varchar', { length: 45 }) 
  id_product: string;

  @Column('uuid')
  id_sale: string;

  @Column('uuid', { nullable: true })
  id_side: string | null;


  // 👉 nuevos
  @Column('decimal', { nullable: true })
  unit_price: number;

  @Column('decimal', { nullable: true })
  discount: number;

  @Column('jsonb', { nullable: true })
  product_snapshot: any;

  @Column('varchar', { nullable: true })
  description: string;

  @Column('varchar', { length: 4, nullable: true })
  igv_affectation_code: string;

  @Column('varchar', { nullable: true })
  unit_code: string;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column('char', { length: 1, nullable: true })
  state_audit: string;
}
