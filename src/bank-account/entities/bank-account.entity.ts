import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('bank_account')
export class BankAccount {
  @PrimaryColumn('uuid')
  id_bank_account: string;

  @Column({ type: 'varchar', nullable: true })
  account_number: string;

  @Column({ type: 'varchar', nullable: true })
  code: string;

  @Column({ type: 'varchar', nullable: true })
  holder_name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  bank_id: number;

  @Column({ type: 'int', nullable: true })
  currency_id: number;

  @Column({ type: 'uuid', nullable: true })
  local_id: string;

  @Column({ type: 'varchar', nullable: true })
  type: string;

  @Column({ type: 'varchar', nullable: true })
  cci: string;

  @Column({ type: 'varchar', nullable: true })
  accounting_account: string;

  @Column({ type: 'bool', nullable: true })
  use_in_payments: boolean;

  @Column({ type: 'bool', nullable: true })
  use_in_retentions: boolean;

  @Column({ type: 'bool', nullable: true })
  use_in_transfers: boolean;

  @Column({ type: 'bool', default: true })
  active: boolean;

  @Column({ type: 'numeric', precision: 18, scale: 6, nullable: true })
  balance: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'char', length: 1 })
  state_audit: string;
}
