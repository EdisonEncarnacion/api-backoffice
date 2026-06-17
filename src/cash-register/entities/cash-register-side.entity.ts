import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('cash_register_sides')
export class CashRegisterSide {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'int', default: 1 })
  state: number;

  /** FK → cash_register.id_cash_register (backoffice) */
  @Column('uuid')
  cash_register_id: string;

  /** Local al que pertenece esta caja */
  @Column('uuid')
  id_local: string;

  /** FK → side.id_side (backoffice) */
  @Column('uuid')
  side_id: string;

  @Column({ type: 'char', length: 1, nullable: false, default: 'A' })
  state_audit: string;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'timestamptz' })
  updated_at: Date;
}
