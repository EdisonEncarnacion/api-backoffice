// src/general-type/entities/general-type.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('general_type')
export class GeneralType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'char', length: 1, default: 'A' })
  state_audit: 'A' | 'I';
}
