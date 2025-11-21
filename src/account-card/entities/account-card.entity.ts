import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('account_card')
export class AccountCard {
  @PrimaryColumn('uuid')
  id_account_card: string; 

  @Column({ type: 'varchar', length: 50, nullable: true })
  card_number: string;

  @Column({ type: 'numeric', precision: 18, scale: 6, nullable: true })
  balance: number;

  @Column({ type: 'int', nullable: true })
  card_type_id: number;

  @Column({ type: 'uuid', nullable: true })
  vehicle_id: string;

  @Column({ type: 'uuid', nullable: true })
  account_id: string;

  @Column({ type: 'int', nullable: true })
  status: number;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
