import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('vehicle')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id_vehicle: string;

  @Column({ nullable: false })
  vehicle_plate: string;

  @Column({ type: 'varchar', nullable: true })
  vehicle_code: string | null;

  @Column({ type: 'int', nullable: true })
  mileage: number;

  @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'" })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'" })
  updated_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updated_sync_at: Date;

  @Column({ type: 'char', length: 1, nullable: true })
  state_audit: string;
}
