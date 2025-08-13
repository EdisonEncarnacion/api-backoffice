import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('flow_meter')
export class FlowMeter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  side_id: string;

  @Column('uuid')
  id_cash_register: string;

  @Column('int')
  product_id: number;

  @Column('float')
  initial_cm: number;

  @Column('float')
  final_cm: number;

  @Column('uuid')
  local_id: string;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit: string | null;


  @Column('uuid')
  hose_id: string;
}
