import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('authorization_code')
export class AuthorizationCode {

    @PrimaryColumn('uuid', { name: 'id_authorization' })
    id_authorization: string;

    @Column({ type: 'varchar', length: 10, name: 'code' })
    code: string;

    @Column({ type: 'uuid', name: 'id_local' })
    id_local: string;

    @Column({ type: 'timestamptz', name: 'expires_at' })
    expires_at: Date;

    @Column({ type: 'int', name: 'duration' })
    duration: number;

    @Column({ type: 'bool', name: 'used' })
    used: boolean;

    @Column({ type: 'uuid', nullable: true, name: 'sale_id' })
    sale_id: string;

    @Column({ type: 'uuid', name: 'created_by' })
    created_by: string;

    @Column({ type: 'timestamptz', name: 'created_at' })
    created_at: Date;

    @Column({ type: 'timestamptz', name: 'updated_at' })
    updated_at: Date;
}
