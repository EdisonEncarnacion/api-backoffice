import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('role')
export class Role {
    @PrimaryColumn('uuid')
    id_role: string;

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
