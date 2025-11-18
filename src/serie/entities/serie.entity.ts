import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('serie')
export class Serie {
  @PrimaryColumn('uuid')
  id_serie: string;

  @Column({ type: 'int', nullable: true })
  correlative_start: number;

  @Column({ type: 'int', nullable: true })
  correlative_current: number;

  @Column({ type: 'varchar', length: 20 })
  series_number: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  description: string;

  @Column({ type: 'uuid', nullable: true })
  id_group_serie: string;

  @Column({ type: 'uuid', nullable: true })
  id_sale_document_type: string;

  @Column({ type: 'uuid', nullable: true })
  origin_document_type_id: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

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
