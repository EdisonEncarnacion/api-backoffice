import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('employee')
export class Employee {
  @PrimaryColumn('uuid')
  id_employee: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  document_number: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'int', nullable: true })
  state: number;

  @Column({ type: 'uuid', nullable: true })
  id_user: string;

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


}
