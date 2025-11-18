import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('account_card_type')
export class AccountCardType {
  @PrimaryColumn('int')
  id_account_type: number;

  @Column({ type: 'varchar', nullable: false })
  code: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit?: string;
}
