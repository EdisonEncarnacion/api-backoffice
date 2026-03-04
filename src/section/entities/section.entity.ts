import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('sections')
export class Section {
    @PrimaryColumn({ name: 'id_section', type: 'int4' })
    id_section: number;

    @Column({ type: 'varchar', nullable: true })
    code: string;

    @Column({ type: 'varchar', nullable: true })
    name_section: string;

    @Column({ type: 'jsonb', nullable: true })
    fields: object;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'char', length: 1 })
    state_audit: string;
}
