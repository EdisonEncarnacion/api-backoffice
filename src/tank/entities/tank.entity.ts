import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tank')
export class Tank {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'numeric', precision: 19, scale: 12 })
  capacity: number;

  @Column({ type: 'int' })
  product_id: number;

  @Column({ type: 'varchar', length: 50 })
  fuel_type: string;

  @Column({ type: 'varchar', nullable: true })
  location: string;

  @Column({ type: 'int' })
  state: number;

  @Column({ type: 'numeric', precision: 19, scale: 12 })
  initial_stick: number;

  @Column({ type: 'numeric', precision: 19, scale: 12 })
  last_stick: number;

  @Column({ type: 'uuid' })
  local_id: string;

  @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updated_sync_at: Date;

  @Column({ type: 'char', nullable: true })
  state_audit: string;
}
