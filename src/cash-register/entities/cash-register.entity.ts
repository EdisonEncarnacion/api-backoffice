import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity('cash_register')
export class CashRegister {
    @PrimaryColumn('uuid')
    id_cash_register: string;

    @Column({ type: 'int', unique: true })
    cash_register_code: number;

    @Column()
    id_state: number; 

    @Column({ type: 'timestamp' })
    opennig_date: Date;

    @Column({ type: 'timestamp', nullable: true })
    last_closing_date: Date | null;

    @Column('uuid')
    id_local: string;

    @Column('uuid', { nullable: true })
    id_group_serie: string | null;

    @Column('uuid')
    id_user: string;

    @Column()
    id_work_shift: number; 

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;
}
