import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Person } from '../../person/person.entity';

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

  @OneToOne(() => Person)
  @JoinColumn({ name: 'id_person' })
  person: Person;

  @Column('uuid')
  id_person: string;

  @Column()
  document_number: string; // <- nuevo campo agregado

  @Column()
  telphone_number: string;

  @Column()
  email: string;

  @Column('int')
  state: number;

  @Column({ type: 'date', nullable: true })  
  date_of_birth: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_sync_at: Date;

  @Column({ type: 'uuid', nullable: true })
origin_branch_id: string | null;

  @Column()
  id_document_type: number;

  @Column()
  id_person_type: number;
}
