import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('deposit_type')
export class DepositType {
    @PrimaryColumn()
    code_deposit_type: string;

    @Column({ type: 'char' }) // o { type: 'bpchar' } si prefieres ser más explícito
    movement_type: string;

    @Column()
    description: string;

    @Column({ type: 'char' }) // o 'bpchar'
    state: string;
}
