import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('serie')
export class Serie {
  @PrimaryColumn('int')   
  id_serie: number;

  @Column({ default: 1 }) 
  correlative_start: number;
  
  @Column()
  series_number: string;

  @Column()
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  correlative_current: number;

  @Column()
  id_sale_document_type: number;

  @Column('uuid')
  id_local: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ default: 'A' })
  state_audit: string;
}
