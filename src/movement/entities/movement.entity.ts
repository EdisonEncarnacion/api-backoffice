import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('movement')
export class Movement {
  @PrimaryColumn('uuid')
  id_movement: string;

  @Column({ type: 'uuid' })
  account_id: string;

  @Column({ type: 'uuid' })
  type_id: string;

  @Column({ type: 'uuid', nullable: true })
  card_id: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  reference_document: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  balance_after: number;

  @Column({ type: 'timestamptz' })
  issued_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updated_sync_at: Date;
}
