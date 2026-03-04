import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('report_sections')
export class ReportSection {
    @PrimaryColumn({ name: 'id_report_sections', type: 'int4' })
    id_report_sections: number;

    @Column({ name: 'id_report', type: 'int4', nullable: true })
    id_report: number;

    @Column({ name: 'id_section', type: 'int4', nullable: true })
    id_section: number;

    @Column({ type: 'bool', default: true })
    active: boolean;

    @Column({ name: 'order', type: 'int4', nullable: true })
    order: number;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'char', length: 1 })
    state_audit: string;
}
