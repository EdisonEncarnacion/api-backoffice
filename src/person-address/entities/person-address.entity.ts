// person-address.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('person_address')
export class PersonAddress {
  @PrimaryColumn('uuid')
  id_person_address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  person_type: string;

  @Column({ type: 'uuid', nullable: true })
  person_id: string;

  @Column({ type: 'uuid', nullable: true })
  address_id: string;

  @Column({ type: 'int', nullable: true })
  address_type_id: number;

  @Column({ type: 'boolean', nullable: true })
  is_primary: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  valid_from: Date;

  @Column({ type: 'timestamptz', nullable: true })
  valid_to: Date;

  @Column({ type: 'int', nullable: true })
  state: number;

  @Column({ type: 'timestamptz', nullable: true })
  updated_sync_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updated_at: Date;

  @Column({ type: 'varchar', length: 1, nullable: true })
  state_audit: string;
}
