// client.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryColumn('uuid')
  id_client: string;

  @Column()
  client_code: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  document_number: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @Column()
  document_type_id: number;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'uuid', nullable: true })
  origin_branch_id: string | null;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'" })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'" })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_sync_at: Date;

  @Column({ type: 'int', nullable: true })
  state: number;


  @Column({ type: 'char', length: 1, nullable: true })
  state_audit?: 'A' | 'I';
}

