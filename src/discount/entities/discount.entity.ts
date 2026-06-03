import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('discount')
export class Discount {
  @PrimaryColumn('uuid')
  id_discount: string;

  @Column({ type: 'uuid', nullable: true })
  id_local: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  assignment_type: string;

  @Column({ type: 'int4', nullable: true })
  discount_type_id: number;

  @Column({ type: 'uuid', nullable: true })
  id_client: string;

  @Column({ type: 'uuid', nullable: true })
  id_group: string;

  @Column({ type: 'int4', nullable: true })
  id_product: number;

  @Column({ type: 'numeric', precision: 18, scale: 6, nullable: true })
  min_quantity: number;

  @Column({ type: 'numeric', precision: 18, scale: 6, nullable: true })
  amount: number;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit: string;

  // created_by y updated_by NO se sincronizan a ventas (no existen allá)
  @Column({ type: 'uuid', nullable: true })
  created_by: string;

  @Column({ type: 'uuid', nullable: true })
  updated_by: string;
}
