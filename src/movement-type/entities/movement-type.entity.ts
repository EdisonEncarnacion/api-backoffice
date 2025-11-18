import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('movement_type')
export class MovementType {
  @PrimaryColumn('int')
  id_movement_document_type: number; 

  @Column({ type: 'varchar', length: 50, nullable: false })
  code: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
