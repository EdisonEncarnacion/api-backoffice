import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('work_shift')
export class WorkShift {
    @PrimaryColumn('uuid')
    id_work_shift: string;

    @Column({ type: 'varchar', nullable: true })
    shift_name: string;

    @Column({ type: 'time', nullable: true })
    start_time: string;

    @Column({ type: 'time', nullable: true })
    end_time: string;

    @Column({ type: 'uuid', nullable: true })
    id_local: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'char', length: 1 })
    state_audit: string;
}
