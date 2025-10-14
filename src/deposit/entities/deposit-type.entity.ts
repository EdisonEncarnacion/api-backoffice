import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('deposit_type')
export class DepositType {
    @PrimaryColumn()
    code_deposit_type: string;

    @Column({ type: 'char' }) 
    movement_type: string;

    @Column()
    description: string;

    @Column({ name: 'state_audit', type: 'char' })
    state_audit: string;
}
