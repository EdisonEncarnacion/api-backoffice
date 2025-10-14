import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity('product')
export class Product {
  @PrimaryColumn()
  product_id: number; // ← viene desde Ventas, no se autoincrementa

  @Column()
  description: string;

  @Column()
  foreign_name: string;

  @Column({ type: 'int', default: 1 })
  state: number;

  @Column()
  group_code: string;

  @Column('decimal')
  price: number;

  @Column({ default: false })
  is_taxable: boolean;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'varchar', nullable: true })
  measurement_unit: string;

  @Column({ nullable: true })
  group_product_id: number;

  @Column('uuid')
  id_local: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ default: 'A' })
  state_audit: string;

  @Column({ type: 'varchar', nullable: true })
  product_code: string;

  @Column({ type: 'timestamp', nullable: true })
  updated_sync_at: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  stock_updated_sync_at: Date | null;
}
