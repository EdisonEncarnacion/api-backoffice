import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product_local')
export class ProductLocal {
  @PrimaryGeneratedColumn('increment')
  product_local_id: number;

  @Column({ type: 'int' })
  product_id: number;

  @Column({ type: 'uuid' })
  id_local: string;

  @Column({ type: 'numeric', precision: 18, scale: 6, default: 0 })
  stock: number;

  @Column({ type: 'boolean', default: false })
  manage_stock: boolean;

  @Column({ type: 'numeric', precision: 18, scale: 6, default: 0 })
  price: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit: string;
}
