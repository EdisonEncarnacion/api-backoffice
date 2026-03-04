import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('reports')
export class Report {
    @PrimaryColumn({ name: 'id_report', type: 'int4' })
    id_report: number;

    @Column({ type: 'varchar', nullable: true })
    code: string;

    @Column({ type: 'varchar', nullable: true })
    name_report: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'char', length: 1 })
    state_audit: string;
}
