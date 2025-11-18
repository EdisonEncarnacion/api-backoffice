import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('increment')
  product_id: number; 

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  foreign_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  product_code: string;

  @Column({ type: 'int', nullable: true })
  state: number;

  @Column({ type: 'numeric', precision: 18, scale: 6, nullable: true })
  price: number;

  @Column({ type: 'boolean', default: false })
  is_taxable: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  measurement_unit: string;

  @Column({ type: 'int', nullable: true })
  group_product_id: number;

  @Column({ type: 'boolean', default: false })
  manages_stock: boolean;

  @Column({ type: 'int', nullable: true })
  detraction_type_id: number;

  @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'" })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'" })
  updated_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updated_sync_at: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit: string;
}
