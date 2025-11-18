import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('account_product')
export class AccountProduct {
  @PrimaryColumn('uuid')
  id_account_card_product: string; 
  @Column({ type: 'uuid', nullable: false })
  id_account: string; 
  @Column({ type: 'int', nullable: false })
  id_product: number; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit?: string;
}
