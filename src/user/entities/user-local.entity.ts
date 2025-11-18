import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('user_local')
export class UserLocal {
 @PrimaryColumn('uuid')
  id_user_local: string;

  @Column({ type: 'uuid' })
  user_auth_id: string;

  @Column({ type: 'uuid' })
  local_id: string;

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

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit: string;
}
