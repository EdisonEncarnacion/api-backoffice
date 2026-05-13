// address.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryColumn('uuid')
  id_address: string;

  @Column({ nullable: true })
  address_line1: string;

  @Column({ nullable: true })
  address_line2: string;

  @Column({ nullable: true })
  reference: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state_province: string;

  @Column({ nullable: true })
  postal_code: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  country_code: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  department_id: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  province_id: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  district_id: string;

  @Column({ type: 'numeric', precision: 9, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'numeric', precision: 9, scale: 6, nullable: true })
  longitude: number;

  @Column({ type: 'timestamptz', nullable: true })
  updated_sync_at: Date;

  @Column({ type: 'int', nullable: true })
  state: number;

  @Column({ type: 'timestamptz', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updated_at: Date;

  @Column({ type: 'varchar', length: 1, nullable: true })
  state_audit: string;
}
