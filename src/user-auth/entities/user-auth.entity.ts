import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_auth')
export class UserAuth {
    @PrimaryGeneratedColumn('uuid')
    id_user: string;

    @Column({ type: 'varchar', length: 100 })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    card_number: string;

    @Column({ type: 'uuid' })
    tenant_id: string;
}
