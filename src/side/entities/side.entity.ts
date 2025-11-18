import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('side')
export class Side {
  @PrimaryColumn('uuid')
  id_side: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'int', default: 1 })
  state: number;

  @Column({ type: 'uuid' })
  local_id: string;

  @Column({ type: 'int', generated: 'increment' })
  migration_sync_id: number;

  @Column({
    type: 'timestamptz',
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'",
  })
  created_at: Date;

  @Column({
    type: 'timestamptz',
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'",
  })
  updated_at: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit: string;
}
