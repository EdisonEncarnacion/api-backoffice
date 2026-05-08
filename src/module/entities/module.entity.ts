import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('module')
export class Module {
    @PrimaryColumn('int4')
    id_module: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;


    @Column({ type: 'varchar', nullable: true })
    description: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'char', length: 1 })
    state_audit: string;
}
