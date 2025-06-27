import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('side')
export class Side {
    @PrimaryGeneratedColumn('uuid')
    id_side: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'int', default: 1 })
    state: number;

    @Column({ type: 'uuid' })
    local_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'int', default: 1 })
    state_audit: number;

    @Column({ type: 'varchar', nullable: true })
    product_id: string;
}
