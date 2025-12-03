import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('account_card_product')
export class AccountCardProduct {
  @PrimaryColumn('uuid')
  id_account_card_product: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit?: string;

  @Column({ type: 'uuid', nullable: false })
  id_account_card: string;

  @Column({ type: 'uuid', nullable: false })
  id_product: string;
}
