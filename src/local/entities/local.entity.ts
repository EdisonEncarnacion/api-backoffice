import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('local')
export class Local {
  @PrimaryColumn('uuid')
  id_local: string;

  @Column('varchar', { nullable: true })
  name: string;

  @Column('varchar', { length: 45, nullable: true })
  local_code: string;

  @Column('varchar', { length: 45, nullable: true })
  telephone_number: string;

  @Column('varchar', { length: 250, nullable: true })
  address: string;

  @Column('varchar', { nullable: true })
  ruc: string;

  @Column('varchar', { nullable: true })
  ubigeo: string;

  @Column('varchar', { nullable: true })
  local_name: string;

  @Column('varchar', { nullable: true })
  country_code: string;

  @Column('varchar', { nullable: true })
  urbanizacion: string;

  @Column('int4', { nullable: true })
  phone_number: number;

  @Column('varchar', { nullable: true })
  email: string;

  @Column('int4', { nullable: true })
  migration_sync_id: number;

  @Column('timestamptz', { nullable: true })
  created_at: Date;

  @Column('timestamptz', { nullable: true })
  updated_at: Date;

  @Column('char', { length: 1, nullable: true })
  state_audit: string;

  @Column('char', { length: 2, nullable: true })
  id_department: string;

  @Column('char', { length: 4, nullable: true })
  id_province: string;

  @Column('char', { length: 6, nullable: true })
  id_district: string;
}
