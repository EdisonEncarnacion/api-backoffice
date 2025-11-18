import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('group_serie')
export class GroupSerie {
  @PrimaryColumn('uuid')
  id_group_serie: string;

  @Column({ type: 'int', nullable: true })
  id_tipo: number;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'boolean', default: false })
  is_used: boolean;

  @Column({ type: 'uuid', nullable: true })
  id_local: string;

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
