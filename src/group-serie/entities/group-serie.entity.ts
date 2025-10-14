import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('group_serie')
export class GroupSerie {
  @PrimaryGeneratedColumn('uuid')
  id_group_serie: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'boolean', default: true })
  is_used: boolean;

  @Column({ type: 'uuid' })
  id_local: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_sync_at: Date | null;

  @Column({ type: 'varchar', length: 50, default: 'CREATED' })
  state_audit: string;
}
