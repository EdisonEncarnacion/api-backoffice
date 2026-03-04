import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity('user_auth')
export class User {
  @PrimaryColumn('uuid')
  id_user: string;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  card_number: string;

  @Column({ type: 'uuid', nullable: true })
  tenant_id: string;

  @Column({ name: 'role_id', type: 'uuid', nullable: true })
  role_id: string;

  @ManyToOne(() => Role, { nullable: true, eager: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ type: 'uuid', nullable: true })
  migration_sync_id: string;

  @Column({
    type: 'timestamptz',
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'",
  })
  created_at: Date;

  @Column({
    type: 'timestamptz',
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'",
  })
  updated_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updated_sync_at: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit: string;
}
