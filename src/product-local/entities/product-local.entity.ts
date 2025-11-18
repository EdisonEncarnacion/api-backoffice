import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product_local')
export class ProductLocal {
  @PrimaryGeneratedColumn('uuid')
  product_local_id: string;

  @Column({ type: 'uuid', nullable: false })
  product_id: string;

  @Column({ type: 'uuid', nullable: false })
  id_local: string;

  @Column({ type: 'numeric', precision: 18, scale: 6, nullable: true })
  stock: number;

  @Column({ type: 'boolean', default: false })
  manage_stock: boolean;

  @Column({ type: 'numeric', precision: 18, scale: 6, nullable: true })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit?: string;
}
