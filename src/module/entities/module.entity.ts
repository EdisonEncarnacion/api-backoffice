import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('module')
export class Module {
    @PrimaryColumn('uuid')
    id_module: string;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'int4', nullable: false })
    system_id: number;

    @Column({ type: 'varchar', nullable: true })
    description: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'char', length: 1 })
    state_audit: string;
}
