import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('driver')
export class Driver {
  @PrimaryColumn('uuid')
  id_driver: string;

  @Column({ nullable: true })
  code_driver: string;

  @Column({ nullable: true })
  license: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  document_number: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'int', default: 1 })
  state: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_sync_at: Date;
}
