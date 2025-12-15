import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('bank')
export class Bank {
  @PrimaryColumn('uuid')
  id_bank: string;

  @Column({ type: 'varchar', nullable: true })
  code: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'bool', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'char', length: 1 })
  state_audit: string;
}
