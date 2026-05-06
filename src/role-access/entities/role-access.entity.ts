import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('role_access')
export class RoleAccess {
    @PrimaryColumn('uuid')
    id_role_access: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'char', length: 1 })
    state_audit: string;

    @Column({ type: 'int4', nullable: true, name: 'role_id' })
    role_id: number;

    @Column({ type: 'int4', nullable: true, name: 'module_id' })
    module_id: number;

    @Column({ type: 'int2', nullable: true, name: 'permissions' })
    permissions: number;
}
