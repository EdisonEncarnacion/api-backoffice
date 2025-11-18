// src/deposit/entities/deposit.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('deposit')
export class Deposit {
  @PrimaryColumn()
   id_deposit: number; 

  @Column({ type: 'timestamp' })
  date_process: Date;

  @Column('uuid')
  id_cash_register: string;

  @Column()
  total_amount: number;

  @Column()
  deposit_number: string;

  @Column()
  id_currency: number;

  //@Column({ type: 'char', length: 1 })
  //state: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @Column()
  code_deposit_type: string;

  @Column('uuid', { nullable: true }) 
  id_local: string;
}
