import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('hose')
export class Hose {
  @PrimaryColumn('uuid')
  id_hose: string;

  @Column({ type: 'varchar', length: 100 })
  hose_name: string;

  @Column({ type: 'numeric', nullable: true })
  initial_cm?: number;

  @Column({ type: 'numeric', nullable: true })
  last_cm?: number;

  @Column({ type: 'int' })
  hose_position: number;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'uuid' })
  side_id: string;

  @Column({ type: 'uuid', nullable: true })
  tank_id?: string;

  @Column({ type: 'uuid' })
  id_local: string;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit?: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
