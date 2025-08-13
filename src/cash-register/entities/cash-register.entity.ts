import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('cash_register')
export class CashRegister {
    @PrimaryColumn('uuid')
    id_cash_register: string;

    @Column({ unique: true })
    cash_register_code: string;


    @Column()
    id_state: number; 

    @Column({ type: 'timestamp' })
    opennig_date: Date;

    @Column({ type: 'timestamp', nullable: true })
    last_closing_date: Date | null;


    @Column({ type: 'timestamp' })
    register_date: Date;

    @Column('uuid')
    id_local: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    @Column()
    state: number;

    @Column('uuid')
    id_user: string;

    @Column()
    id_work_shift: number; 


    @Column()
    id_serie: number; 

}
