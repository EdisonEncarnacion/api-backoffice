import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('account')
export class Account {
  @PrimaryColumn('uuid')
  id_account: string;

  @Column({ type: 'numeric', precision: 18, scale: 6, nullable: true })
  credit_line: number;

  @Column({ type: 'numeric', precision: 18, scale: 6, nullable: true })
  balance: number;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ type: 'int', nullable: true })
  billing_days: number;

  @Column({ type: 'int', nullable: true })
  credit_days: number;

  @Column({ type: 'int', nullable: true })
  installments: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  attachment_url: string;

  @Column({ type: 'uuid', nullable: true })
  client_id: string;

  @Column({ type: 'int', nullable: true })
  account_type_id: number;

  @Column({ type: 'int', nullable: true })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit?: string;

  @Column({ type: 'int', nullable: true })
  local_id?: number;
}
